import { projectInsertSchema } from '$lib/server/api/projects/projects.types';
import { validateWithZodV2 } from '$lib/utils/validateWIthZod';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const fd = await event.request.formData();

		const { errors, data } = validateWithZodV2({
			data: Object.fromEntries(fd),
			schema: projectInsertSchema,
		});

		console.log(data, errors);

		if (errors) {
			return fail(400, { errors });
		}

		// const coverImagePaylod = {
		// 	file: fd.get('coverImageFile') as File,
		// 	alt: String(fd.get('coverImageAlt')),
		// };

		// const projectMetaPayload = {
		// 	title: String(fd.get('title')),
		// 	description: String(fd.get('description')),
		// 	category: String(fd.get('category')) as Category,
		// };

		// const { success: projectSuccess, errors: projectErrors } = validateWithZod({
		// 	schema: projectInsertSchema,
		// 	data: projectMetaPayload,
		// });

		// const { success: coverImageSuccess, errors: coverImageErrors } =
		// 	validateWithZod({
		// 		schema: UploadImageSchema,
		// 		data: coverImagePaylod,
		// 	});

		// if (!projectSuccess || !coverImageSuccess) {
		// 	return fail(400, { errors: { ...projectErrors, ...coverImageErrors } });
		// }

		// try {
		// 	const newCoverImage = await routing.images.create(coverImagePaylod);

		// 	const newProjectPayload = {
		// 		...projectMetaPayload,
		// 		coverImageId: newCoverImage.id,
		// 		isFeatured: true,
		// 	};
		// 	const newProject = await routing.projects.create(newProjectPayload);

		// 	const imagesList = prepareImages(fd);
		// 	const imagesPromises = imagesList.map((image) => {
		// 		const payload = {
		// 			file: image.file as File,
		// 			alt: image.alt,
		// 		};
		// 		return routing.images.create(payload);
		// 	});

		// 	const imagesPromisesResult = await Promise.all(imagesPromises);

		// 	for await (const image of imagesPromisesResult) {
		// 		routing.projectsToImagesService.createRelation({
		// 			projectId: newProject.id,
		// 			imageId: image.id,
		// 		});
		// 	}

		// 	console.log('New project created successfully');
		// 	return { success: true };
		// } catch (error) {
		// 	console.log(error);
		// }
	},
};
