import { STATUS_CODE } from '$lib/constants';
import { routing } from '$lib/server/api/routing';
import type { ActionRequestEvent } from '$lib/types/sveltekit';
import { validateWithZod } from '$lib/utils/validateWIthZod';
import { UploadImageValidationSchema } from '$lib/validationSchema/images';
import { fail } from '@sveltejs/kit';

export const uploadImageAction = async (event: ActionRequestEvent) => {
	const fd = await event.request.formData();
	const file = fd.get('file');
	const alt = fd.get('alt');
	const imagePayload = {
		file: file as File,
		alt: String(alt),
	};
	const { errors } = validateWithZod({
		data: imagePayload,
		schema: UploadImageValidationSchema(),
	});

	if (errors) {
		return fail(STATUS_CODE.BAD_REQUEST, { ...errors });
	}

	try {
		const uploadedImage = await routing.images.create(imagePayload);
		return {
			success: true,
			image: uploadedImage,
		};
	} catch (error) {
		return {
			success: false,
			errors: error?.message,
		};
	}
};

export const editImageAction = async (event: ActionRequestEvent) => {
	const fd = await event.request.formData();
	const id = Number(fd.get('id'));
	const file = fd.get('file');
	const alt = String(fd.get('alt'));

	if (!id) {
		return fail(STATUS_CODE.BAD_REQUEST, { id: ['Image ID is required'] });
	}

	const imagePayload = {
		alt: String(alt),
		...(file && { file: file as File }),
	};
	const { errors } = validateWithZod({
		data: imagePayload,
		schema: UploadImageValidationSchema(true),
	});

	if (errors) return fail(STATUS_CODE.BAD_REQUEST, { ...errors });

	try {
		const updatedImage = await routing.images.update(id, imagePayload);
		return {
			success: true,
			image: updatedImage,
			toast: {
				title: 'Success!',
				message: 'Your image has been updated.',
			},
		};
	} catch (error) {
		return {
			success: false,
			toast: {
				title: 'Error!',
				message: error?.message,
			},
		};
	}
};

export const removeImageAction = async (event: ActionRequestEvent) => {
	const fd = await event.request.formData();
	const id = Number(fd.get('id'));

	if (!id) {
		return fail(STATUS_CODE.BAD_REQUEST, { id: ['Image ID is required'] });
	}

	try {
		const removedImage = await routing.images.delete(id);
		return {
			success: true,
			image: removedImage,
			toast: {
				title: 'Success!',
				message: 'Your image has been removed.',
			},
		};
	} catch (error) {
		return {
			success: false,
			toast: {
				title: 'Error!',
				message: error?.message,
			},
		};
	}
};
