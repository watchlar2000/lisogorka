import { routing } from '$lib/server/api/routing';
import type { Category } from '$lib/server/api/types/types';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const fd = await event.request.formData();

		try {
			const newCoverImage = await routing.images.create({
				image: fd.get('coverImageFile') as File,
				alt: String(fd.get('coverImageAlt')),
			});
			await routing.projects.create({
				title: String(fd.get('title')),
				description: String(fd.get('description')),
				coverImageId: newCoverImage.id,
				category: String(fd.get('category')) as Category,
				isFeatured: true,
			});

			console.log('New project created successfully');
		} catch (error) {
			console.log(error);
		}
	},
};
