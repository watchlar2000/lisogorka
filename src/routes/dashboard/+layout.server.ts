import { routing } from '$lib/server/api/routing';
import { InternalError } from '$lib/utils/exceptions';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/auth/login');
	}

	try {
		const projects = await routing.projects.listAll();

		return {
			user: event.locals.user,
			projects,
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		InternalError(
			'An error occurred while loading projects. Please try again later.',
		);
	}
};
