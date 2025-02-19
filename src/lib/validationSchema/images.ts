import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '$lib/constants';
import { z } from 'zod';

export const UploadImageSchema = z.object({
	file: z
		.instanceof(File, { message: 'Upload an image file' })
		.refine((file) => {
			return file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'Either file type is incorrect or selected image type is not supported.'),
	alt: z.string().min(5, { message: 'Alt text is required' }),
});

export const EditImageSchema = UploadImageSchema.pick({ alt: true });
export const FileSchema = UploadImageSchema.pick({ file: true });

export type UploadImage = z.infer<typeof UploadImageSchema>;
export type EditImage = z.infer<typeof EditImageSchema>;
