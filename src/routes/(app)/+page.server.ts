import { routing } from '$lib/server/api/routing';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await routing.projects.listAll();
	const test = await routing.projectsToImagesService.getRelatedImageIds(3);

	console.log(test);

	return {
		projects,
	};
};
