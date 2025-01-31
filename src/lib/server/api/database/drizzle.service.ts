import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ConfigService } from '../configs/config';
import * as schema from './schema';

export class DrizzleService {
	private static instance: DrizzleService;
	private configService: ConfigService;
	public readonly schema = schema;
	public readonly _db;

	constructor() {
		this.configService = new ConfigService();
		const connection = postgres(this.configService.envs.DATABASE_URL);
		this._db = drizzle(connection, {
			schema,
		});
	}

	static get db() {
		if (!DrizzleService.instance) {
			DrizzleService.instance = new DrizzleService();
		}
		return DrizzleService.instance._db;
	}
}

export const drizzleService = new DrizzleService();
