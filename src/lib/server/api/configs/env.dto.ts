import { z } from 'zod';

export const envsDTO = z.object({
	DATABASE_URL: z.string(),
});

export type EnvsDTO = z.infer<typeof envsDTO>;
