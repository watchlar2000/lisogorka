import { eq } from 'drizzle-orm';
import type { AnyPgColumn, AnyPgTable } from 'drizzle-orm/pg-core';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { IBaseRepository } from './base.types';

export class BaseRepository<T extends AnyPgTable & { id: AnyPgColumn }, U>
	implements IBaseRepository<T['_']['inferSelect'], T['_']['inferInsert'], U>
{
	private db;
	private schema;

	constructor(db: PostgresJsDatabase<Record<string, unknown>>, schema: T) {
		this.db = db;
		this.schema = schema;
	}

	private query() {
		return this.db.select().from(this.schema).$dynamic();
	}

	async readAll() {
		return this.query();
	}

	async readById(id?: number) {
		const rows = await this.query().where(eq(this.schema.id, id));
		return rows[0];
	}
}
