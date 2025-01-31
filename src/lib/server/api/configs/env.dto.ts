import { z } from 'zod';

export const envsDTO = z.object({
	DATABASE_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
});

export type EnvsDTO = z.infer<typeof envsDTO>;
