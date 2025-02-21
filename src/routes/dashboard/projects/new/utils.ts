import { validateWithZod } from '$lib/utils/validateWIthZod';
import { UploadImageValidationSchema } from '$lib/validationSchema/images';

export const validateImages = <T>(imagesList: T[]) => {
	if (imagesList.length === 0) return { errors: null };

	const errors = imagesList
		.map((image, index) => {
			const { errors } = validateWithZod({
				data: image,
				schema: UploadImageValidationSchema(),
			});
			if (errors) {
				return { index, ...errors };
			} else {
				return null;
			}
		})
		.filter((image) => !!image);

	return { errors };
};
