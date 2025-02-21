import { projectInsertSchema } from '$lib/server/api/projects/projects.types';
import { routing } from '$lib/server/api/routing';
import type { Category } from '$lib/types';
import { validateWithZod } from '$lib/utils/validateWIthZod';
import { fail, type Actions } from '@sveltejs/kit';
import { validateImages } from './utils';

export const actions: Actions = {
	default: async (event) => {
		const fd = await event.request.formData();

		const projectMetaPayload = {
			title: String(fd.get('title')),
			description: String(fd.get('description')),
			category: String(fd.get('category')) as Category,
		};

		const { errors } = validateWithZod({
			data: projectMetaPayload,
			schema: projectInsertSchema,
		});

		const files = fd.getAll('file');
		const alts = fd.getAll('alt');

		const imagesList = files.map((file, idx) => ({
			file,
			alt: alts[idx],
		}));

		const noImagesError =
			imagesList.length === 0 ? { images: 'Please add images' } : {};

		const { errors: imageErrors } = validateImages(imagesList);

		if (errors || !imagesList.length || !!imageErrors?.length) {
			// TODO: think on ways how to display image errors in UI
			const isImagesValid = imageErrors?.length
				? {
						images: `Something wrong with image(s) ${JSON.stringify(Object.values(imageErrors))}`,
					}
				: {};
			return fail(400, {
				errors: { ...errors, ...noImagesError, ...isImagesValid },
			});
		}

		try {
			const coverImagePayload = {
				file: files[0] as File,
				alt: String(alts[0]),
			};
			const newCoverImage = await routing.images.create(coverImagePayload);

			const newProjectPayload = {
				...projectMetaPayload,
				coverImageId: newCoverImage.id,
				isFeatured: true,
			};
			const newProject = await routing.projects.create(newProjectPayload);

			const imagesPromises = imagesList.map((image) => {
				const payload = {
					file: image.file as File,
					alt: String(image.alt),
				};
				return routing.images.create(payload);
			});

			const imagesPromisesResult = await Promise.all(imagesPromises);

			for await (const image of imagesPromisesResult) {
				routing.projectsToImagesService.createRelation({
					projectId: newProject.id,
					imageId: image.id,
				});
			}

			console.log('New project created successfully');
			return { success: true };
		} catch (error) {
			console.log(error);
		}
	},
};
