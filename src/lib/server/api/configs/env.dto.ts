import { z } from 'zod';

export const envsDTO = z.object({
	DATABASE_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	ALLOWED_GOOGLE_EMAIL: z.string().email(),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	CLOUDINARY_CLOUD_PRESET: z.string(),
});

export type EnvsDTO = z.infer<typeof envsDTO>;
