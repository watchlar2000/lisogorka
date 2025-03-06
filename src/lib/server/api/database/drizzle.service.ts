import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ConfigService } from '../configs/config';
import * as schema from './schema';

export class DrizzleService {
	private static instance: DrizzleService;
	public readonly schema = schema;
	public readonly _db: PostgresJsDatabase<typeof schema>;

	constructor(private configService: ConfigService = new ConfigService()) {
		try {
			const { DATABASE_URL } = this.configService.envs;
			const connection = postgres(DATABASE_URL, { prepare: false });
			this._db = drizzle(connection, {
				schema,
			});
		} catch (error: unknown) {
			throw new Error(`Database connection failed: ${error.message}`);
		}
	}

	static get db() {
		if (!DrizzleService.instance) {
			DrizzleService.instance = new DrizzleService();
		}
		return DrizzleService.instance._db;
	}
}
