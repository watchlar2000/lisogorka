import { z } from 'zod';

export const envsDTO = z.object({
	DATABASE_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	ALLOWED_GOOGLE_EMAIL: z.string().email(),
});

export type EnvsDTO = z.infer<typeof envsDTO>;
