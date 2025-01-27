import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z as zod, z } from 'zod';
import { images } from '../database/schema';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

export const imageSelectSchema = createSelectSchema(images);
export const imageInsertSchema = createInsertSchema(images);

export type Image = zod.infer<typeof imageSelectSchema>;
export type NewImage = zod.infer<typeof imageInsertSchema>;

export const createImageDTO = z.object({
	file: z
		.instanceof(File)
		.refine((f) => {
			if (!f) return 'File is required';
			return !f || f.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((f) => {
			if (!f) return 'File is required';
			return ACCEPTED_FILE_TYPES.includes(f.type);
		}, 'Wrong file type'),
	alt: z
		.string({
			required_error: 'Alt text is required',
			invalid_type_error: 'Alt text must be at least 5 characters long',
		})
		.min(5),
});

export type CreateImageDTO = z.infer<typeof createImageDTO>;
