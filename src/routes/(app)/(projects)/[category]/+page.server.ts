import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const allowedPaths = [
	'playground',
	'visual-development',
	'background-painting',
];

export const load: PageServerLoad = async ({ params, parent }) => {
	const isPathValid = allowedPaths.includes(params.category);

	if (!isPathValid) {
		throw error(404, 'Not Found');
	}

	const data = await parent();
	const filteredProjects = data.projects.filter(
		(p) => p.category === params.category,
	);

	return {
		projects: filteredProjects,
	};
};
