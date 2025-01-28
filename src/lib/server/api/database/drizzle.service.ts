import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ConfigService } from '../configs/config';
import * as schema from './schema';

export class DrizzleService {
	db;
	schema = schema;
	#configService;

	constructor() {
		this.#configService = new ConfigService();
		const connection = postgres(this.#configService.envs.DATABASE_URL);
		this.db = drizzle(connection, {
			schema,
		});
	}
}
