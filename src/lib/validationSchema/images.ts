import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'image/webp',
	'image/svg+xml',
	'image/bmp',
	'image/tiff',
	'image/x-icon',
	'image/heic',
	'image/heif',
];

export const UploadImageSchema = z.object({
	file: z
		.instanceof(File, { message: 'Upload an image file' })
		.refine((file) => {
			return file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'Either file type is incorrect or selected image type is not supported.'),
	alt: z.string().min(1, { message: 'Alt text is required' }),
});

export const EditImageSchema = UploadImageSchema.pick({ alt: true });
export const FileSchema = UploadImageSchema.pick({ file: true });

export type UploadImage = z.infer<typeof UploadImageSchema>;
export type EditImage = z.infer<typeof EditImageSchema>;
