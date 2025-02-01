import { routing } from '$lib/server/api/routing';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const projects = await routing.projects.listAll({ isFeatured: true });

	return {
		projects,
	};
};
