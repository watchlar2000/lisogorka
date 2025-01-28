import { sha256 } from '@oslojs/crypto/sha2';
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { sessions, users } from '../api/database/schema';
import type { Session, SessionValidationResult } from './auth.types';

export class AuthService {
	#db;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(db: PostgresJsDatabase<any>) {
		this.#db = db;
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

		const session: Session = {
			userId,
			token: sessionToken,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		};
		await this.#db.insert(sessions).values(session);
		return session;
	}

	async validateSessionToken(token: string): Promise<SessionValidationResult> {
		const sessionToken = encodeHexLowerCase(
			sha256(new TextEncoder().encode(token)),
		);
		const result = await this.#db
			.select({ user: users, session: sessions })
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(eq(sessions.token, sessionToken));

		if (result.length < 1) {
			return { session: null, user: null };
		}

		const { user, session } = result[0];

		if (Date.now() >= session.expiresAt.getTime()) {
			await this.#db.delete(sessions).where(eq(sessions.token, session.token));
			return { session: null, user: null };
		}

		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
			await this.#db
				.update(sessions)
				.set({
					expiresAt: session.expiresAt,
				})
				.where(eq(sessions.token, session.token));
		}

		return { session, user };
	}

	async invalidateSession(sessionId: number): Promise<void> {
		await this.#db.delete(sessions).where(eq(sessions.id, sessionId));
	}
}
