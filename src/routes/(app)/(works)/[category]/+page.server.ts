import { validateWorksRoute } from '$lib/utils/checkWorksRoute';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const isRouteValid = validateWorksRoute(params.category);

	if (!isRouteValid) {
		throw error(404, 'Not Found');
	}

	return {
		params,
	};
};
