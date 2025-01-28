import { decodeIdToken } from 'arctic';

import { DrizzleService } from '$lib/server/api/database/drizzle.service';
import { users } from '$lib/server/api/database/schema';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionTokenCookie } from '$lib/server/auth/cookie';
import { google } from '$lib/server/auth/provider';
import { ObjectParser } from '@pilcrowjs/object-parser';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { eq } from 'drizzle-orm';

const { db } = new DrizzleService();
const authService = new AuthService(db);

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;

	if (
		code === null ||
		state === null ||
		storedState === null ||
		codeVerifier === null
	) {
		return new Response(null, {
			status: 400,
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error(`Error: ${e.message}`);
		return new Response('Something went wrong. Please try one more time.', {
			status: 400,
		});
	}
	const claims = decodeIdToken(tokens.idToken());
	const claimsParser = new ObjectParser(claims);

	const googleId = claimsParser.getString('sub');
	const name = claimsParser.getString('name');
	const email = claimsParser.getString('email');

	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.googleId, googleId));

	if (existingUser) {
		const sessionToken = authService.generateSessionToken();
		const session = await authService.createSession(
			sessionToken,
			existingUser.id,
		);

		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/dashboard',
			},
		});
	}

	const [user] = await db
		.insert(users)
		.values({
			googleId: googleId,
			email: email,
			name: name,
		})
		.returning();

	const sessionToken = authService.generateSessionToken();
	const session = await authService.createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/dashboard',
		},
	});
}
