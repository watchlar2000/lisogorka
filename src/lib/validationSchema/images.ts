import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '$lib/constants';
import { z } from 'zod';

export const UploadImageValidationSchema = (isEditMode = false) => {
	return z.object({
		file: isEditMode
			? z.any()
			: // .instanceof(File, { message: 'Upload an image file' })
				// .refine((file) => {
				// 	return file.size <= MAX_UPLOAD_SIZE;
				// }, 'File size must be less than 3MB')
				// .refine((file) => {
				// 	return ACCEPTED_FILE_TYPES.includes(file.type);
				// }, 'Either file type is incorrect or selected image type is not supported.')
				// .optional()
				z
					.instanceof(File, { message: 'Upload an image file' })
					.refine((file) => {
						return file.size <= MAX_UPLOAD_SIZE;
					}, 'File size must be less than 7MB')
					.refine((file) => {
						return ACCEPTED_FILE_TYPES.includes(file.type);
					}, 'Either file type is incorrect or selected image type is not supported.'),
		alt: z
			.string({ message: 'Alt text is required' })
			.min(5, { message: 'Alt text should be at least 5 chars long' }),
	});
};
