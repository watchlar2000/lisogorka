import { routing } from '$lib/server/db/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await routing.projects.listAll();

	return {
		data,
	};
};
