import { routing } from '$lib/server/api/routing';
import type { Category } from '$lib/server/api/types/types';
import type { Actions } from '@sveltejs/kit';
import { prepareImages } from './utils';

export const actions: Actions = {
	default: async (event) => {
		const fd = await event.request.formData();

		try {
			const newCoverImagePaylod = {
				file: fd.get('coverImageFile') as File,
				alt: String(fd.get('coverImageAlt')),
			};
			const newCoverImage = await routing.images.create(newCoverImagePaylod);

			const newProjectPayload = {
				title: String(fd.get('title')),
				description: String(fd.get('description')),
				coverImageId: newCoverImage.id,
				category: String(fd.get('category')) as Category,
				isFeatured: true,
			};
			const newProject = await routing.projects.create(newProjectPayload);

			const imagesList = prepareImages(fd);
			const imagesPromises = imagesList.map((image) => {
				const payload = {
					file: image.file as File,
					alt: image.alt,
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
		} catch (error) {
			console.log(error);
		}
	},
};
