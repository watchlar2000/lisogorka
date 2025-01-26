import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const acceptedCategoryList = ['visual-development', 'background-painting'];

export const load: PageServerLoad = async ({ params }) => {
	const isCategoryAccepted = acceptedCategoryList.includes(params.category);

	if (!isCategoryAccepted) {
		error(404, 'Not Found');
	}

	return {
		params,
	};
};
