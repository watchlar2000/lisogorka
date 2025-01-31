import { eq, SQL } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { sessions } from '../database/schema';
import type { NewSession, Session, SessionKey } from './sessions.types';

type SessionUpdateRequest = Partial<Pick<Session, SessionKey>> & {
	payload: Partial<NewSession>;
};

export interface ISessionsRepository {
	create(payload: NewSession): Promise<Session>;
	findByKey({ ...keys }: Partial<Pick<Session, SessionKey>>): Promise<Session>;
	deleteByKey({
		...keys
	}: Partial<Pick<Session, SessionKey>>): Promise<Session>;
	updateByKey({ payload, ...keys }: SessionUpdateRequest): Promise<Session>;
}

export class SessionsRepository implements ISessionsRepository {
	db;

	constructor(db: PostgresJsDatabase<Record<string, unknown>>) {
		this.db = db;
	}

	async create(payload: NewSession) {
		const [session] = await this.db
			.insert(sessions)
			.values(payload)
			.returning();

		return session;
	}

	async updateByKey({ payload, ...keys }: SessionUpdateRequest) {
		const where: SQL[] = [];
		const { id, token } = keys;

		if (id) {
			where.push(eq(sessions.id, id));
		} else {
			where.push(eq(sessions.token, String(token)));
		}

		const [session] = await this.db
			.update(sessions)
			.set(payload)
			.where(where[0])
			.returning();
		return session;
	}

	async deleteByKey({ ...keys }: Partial<Pick<Session, SessionKey>>) {
		const where: SQL[] = [];
		const { id, token } = keys;

		if (id) {
			where.push(eq(sessions.id, id));
		} else {
			where.push(eq(sessions.token, String(token)));
		}

		const [session] = await this.db
			.delete(sessions)
			.where(where[0])
			.returning();

		return session;
	}

	async findByKey({ ...keys }: Partial<Pick<Session, SessionKey>>) {
		const where: SQL[] = [];
		const { id, token } = keys;

		if (id) {
			where.push(eq(sessions.id, id));
		} else {
			where.push(eq(sessions.token, String(token)));
		}

		const [session] = await this.db.select().from(sessions).where(where[0]);
		return session;
	}
}
