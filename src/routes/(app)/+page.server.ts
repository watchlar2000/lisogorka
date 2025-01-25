import { routing } from '$lib/server/api/routing';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		projects: await routing.projects.listAll(),
	};
};
