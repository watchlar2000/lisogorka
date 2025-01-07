import { getUsersWithPostsCount } from '$lib/server/db/queries/select';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await getUsersWithPostsCount();

	return {
		data
	};
};
