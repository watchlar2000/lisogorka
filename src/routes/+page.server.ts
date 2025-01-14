import { routing } from '$lib/server/api/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await routing.projects.listAll();

	return {
		data,
	};
};
