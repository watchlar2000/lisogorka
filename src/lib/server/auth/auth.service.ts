import { ALLOWED_GOOGLE_EMAIL } from '$env/static/private';
import { Unauthorized } from '$lib/utils/exceptions';
import { sha256 } from '@oslojs/crypto/sha2';
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from '@oslojs/encoding';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeIdToken, generateCodeVerifier, generateState } from 'arctic';
import { routing } from '../api/routing';
import type { ISessionsService } from '../api/sessions/sessions.service';
import type { NewSession } from '../api/sessions/sessions.types';
import type { IUsersService } from '../api/users/users.service';
import type { Session, SessionValidationResult } from './auth.types';
import { googleService, type GoogleService } from './google.service';

export class AuthService {
	private sessionsService;
	private usersService;
	private googleService;

	constructor(
		sessionsService: ISessionsService,
		usersService: IUsersService,
		googleService: GoogleService,
	) {
		this.sessionsService = sessionsService;
		this.usersService = usersService;
		this.googleService = googleService;
	}

	generateSessionToken() {
		const bytes = new Uint8Array(20);
		crypto.getRandomValues(bytes);
		const token = encodeBase32LowerCaseNoPadding(bytes);
		return token;
	}

	async createSession(token: string, userId: number): Promise<Session> {
		const sessionToken = encodeHexLowerCase(
			sha256(new TextEncoder().encode(token)),
		);

		const session: NewSession = {
			userId,
			token: sessionToken,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
		};
		await this.sessionsService.create(session);
		return session;
	}

	async validateSessionToken(token: string): Promise<SessionValidationResult> {
		const sessionToken = encodeHexLowerCase(
			sha256(new TextEncoder().encode(token)),
		);
		const session = await this.sessionsService.findByToken(sessionToken);

		if (!session) {
			return { session: null, user: null };
		}

		const user = await this.usersService.findById(session.userId);

		if (!user) {
			return { session: null, user: null };
		}

		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
			await this.sessionsService.updateByToken(session.token, {
				expiresAt: session.expiresAt,
			});
		}

		return { session, user };
	}

	async invalidateSession(id: number): Promise<void> {
		await this.sessionsService.deleteById(id);
	}

	generateOAuthDetails() {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		const url = this.googleService.createAuthorizationURL({
			state,
			codeVerifier,
			scopes: ['openid', 'profile', 'email'],
		});
		return { state, codeVerifier, url: url.toString() };
	}

	async authenticateWithGoogle(params: { code: string; codeVerifier: string }) {
		const { code, codeVerifier } = params;

		try {
			const token = await this.googleService.client.validateAuthorizationCode(
				code,
				codeVerifier,
			);

			const claims = decodeIdToken(token.idToken());
			const claimsParser = new ObjectParser(claims);

			const googleId = claimsParser.getString('sub');
			const name = claimsParser.getString('name');
			const email = claimsParser.getString('email');

			if (email !== ALLOWED_GOOGLE_EMAIL) {
				Unauthorized();
			}

			let user = await this.usersService.findByGoogleId(googleId);

			if (!user) {
				user = await this.usersService.create({
					googleId: googleId,
					email: email,
					name: name,
				});
			}

			const sessionToken = this.generateSessionToken();
			const session = await this.createSession(sessionToken, user.id);
			return {
				session,
				sessionToken,
			};
		} catch (error) {
			console.error(`Error: ${error}`);
			return new Response('Something went wrong. Please try one more time.', {
				status: 400,
			});
		}
	}
}

const { sessions, users } = routing;

export const authService = new AuthService(sessions, users, googleService);
