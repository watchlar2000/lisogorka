import {
	editImageAction,
	removeImageAction,
	uploadImageAction,
} from '$lib/server/actions/images';
import { editProjectAction } from '$lib/server/actions/projects';
import { routing } from '$lib/server/api/routing';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const project = await routing.projects.findBySlug(slug);
	const images = await routing.projectsToImagesService.getRelatedImages(
		project.id,
	);

	return {
		project: { ...project, images },
	};
};

export const actions: Actions = {
	editProject: editProjectAction,
	uploadImage: uploadImageAction,
	editImage: editImageAction,
	removeImage: removeImageAction,
};
