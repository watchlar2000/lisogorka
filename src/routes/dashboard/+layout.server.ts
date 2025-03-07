import { routing } from '$lib/server/api/routing';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/auth/login');
	}

	const projects = await routing.projects.listAll();

	return {
		user: event.locals.user,
		projects,
	};
};
