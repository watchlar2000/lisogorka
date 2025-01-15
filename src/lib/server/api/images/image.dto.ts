import { z } from 'zod';

export const imageDTO = z.object({
	id: z.string(),
	url: z.string(),
	alt: z.string(),
	width: z.string(),
	height: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ImageDTO = z.infer<typeof imageDTO>;
