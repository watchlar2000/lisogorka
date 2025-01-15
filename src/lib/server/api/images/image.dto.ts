import { z } from 'zod';

// export const imageDTO = z.object({
// 	id: z.string(),
// 	url: z.string(),
// 	alt: z.string(),
// 	width: z.string(),
// 	height: z.string(),
// 	createdAt: z.date(),
// 	updatedAt: z.date(),
// });

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

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
