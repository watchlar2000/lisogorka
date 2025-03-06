import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const data = await parent();
	const filteredProjects = data.projects.filter(
		(p) => p.category === params.category,
	);

	return {
		projects: filteredProjects,
	};
};
