import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export const serviceFactory =
	<K extends Record<string, unknown>>(db: PostgresJsDatabase<K>) =>
	<T, U>(
		Repo: new (db: PostgresJsDatabase<Record<string, unknown>>) => T,
		Service: new (repo: T) => U,
	): U => {
		const repository = new Repo(db);
		return new Service(repository);
	};
