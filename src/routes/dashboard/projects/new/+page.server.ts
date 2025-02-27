import { STATUS_CODE } from '$lib/constants';
import { projectInsertSchema } from '$lib/server/api/projects/projects.types';
import { routing } from '$lib/server/api/routing';
import type { Category } from '$lib/types';
import { validateWithZod } from '$lib/utils/validateWIthZod';
import { UploadImageValidationSchema } from '$lib/validationSchema/images';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createProject: async (event) => {
		const fd = await event.request.formData();
		const projectMetaPayload = {
			title: String(fd.get('title')),
			description: String(fd.get('description')),
			category: String(fd.get('category')) as Category,
		};
		const { errors: projectMetaErrors } = validateWithZod({
			data: projectMetaPayload,
			schema: projectInsertSchema,
		});
		const imageIdsList = fd.getAll('imageId').map(Number);

		if (projectMetaErrors || !imageIdsList.length) {
			return fail(STATUS_CODE.BAD_REQUEST, {
				...projectMetaErrors,
				images: !imageIdsList.length
					? ['Upload at least one image']
					: undefined,
			});
		}

		try {
			const coverImageId = imageIdsList[0];
			const newProjectPayload = {
				...projectMetaPayload,
				coverImageId,
				isFeatured: true,
			};
			const newProject = await routing.projects.create(newProjectPayload);
			await Promise.all(
				imageIdsList.map((imageId) =>
					routing.projectsToImagesService.createRelation({
						projectId: newProject.id,
						imageId,
					}),
				),
			);
			console.log(':white_check_mark: New project created successfully');
			return { success: true };
		} catch (error) {
			console.log(error);
			return fail(STATUS_CODE.INTERNAL_SERVER_ERROR, {
				errors: 'Failed to create project.',
			});
		}
	},
	uploadImage: async (event) => {
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
			return fail(400, { ...errors });
		}

		const uploadedImage = await routing.images.create(imagePayload);

		return {
			success: true,
			image: uploadedImage,
		};
	},
	editImage: async (event) => {
		const fd = await event.request.formData();

		const id = Number(fd.get('id'));
		const file = fd.get('file');
		const alt = String(fd.get('alt'));

		if (!id) {
			return fail(400, { id: ['Image ID is required'] });
		}

		const imagePayload = {
			alt: String(alt),
			...(file && { file: file as File }),
		};

		const { errors } = validateWithZod({
			data: imagePayload,
			schema: UploadImageValidationSchema(true),
		});

		if (errors) return fail(400, { ...errors });

		const updatedImage = await routing.images.update(id, imagePayload);

		return {
			success: true,
			image: updatedImage,
		};
	},
	removeImage: async (event) => {
		const fd = await event.request.formData();
		const id = Number(fd.get('id'));

		if (!id) {
			return fail(400, { id: ['Image ID is required'] });
		}

		const removedImage = await routing.images.delete(id);
		console.log('removing image');

		return {
			success: true,
			image: removedImage,
		};
	},
};
