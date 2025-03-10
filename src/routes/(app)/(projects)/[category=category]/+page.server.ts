import { toTitleCase } from '$lib/utils/toTitleCase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const data = await parent();
	const filteredProjects = data.projects.filter(
		(p) => p.category === params.category,
	);
	const seo = {
		title: toTitleCase(params.category) + ' Projects | Iryna Lisogor',
	};

	return {
		projects: filteredProjects,
		seo,
	};
};
