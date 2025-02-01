import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { and, eq, SQL } from 'drizzle-orm';
import { users } from '../database/schema';
import type {
	NewUser,
	PartialUser,
	User,
	UserUpdateRequest,
} from './users.types';

export interface IUsersRepository {
	create(payload: NewUser): Promise<User>;
	findByKey({ ...keys }: PartialUser): Promise<User>;
}

export class UsersRepository implements IUsersRepository {
	db;

	constructor(db: PostgresJsDatabase<Record<string, unknown>>) {
		this.db = db;
	}

	async create(payload: NewUser) {
		const [user] = await this.db.insert(users).values(payload).returning();
		return user;
	}
	async findByKey({ ...keys }: UserUpdateRequest) {
		const { email, googleId, name, id } = keys;
		const where: SQL[] = [];

		if (googleId) {
			where.push(eq(users.googleId, googleId));
		}

		if (email) {
			where.push(eq(users.email, email));
		}

		if (name) {
			where.push(eq(users.name, name));
		}

		if (id) {
			where.push(eq(users.id, id));
		}

		const [user] = await this.db
			.select()
			.from(users)
			.where(and(...where));
		return user;
	}
}
