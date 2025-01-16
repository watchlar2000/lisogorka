import { defineConfig } from 'drizzle-kit';
import { ConfigService } from './src/lib/server/api/configs/config';

const config = new ConfigService();

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: config.envs.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
