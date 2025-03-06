import { authService } from '$lib/server/auth/auth.service';
import { deleteSessionTokenCookie } from '$lib/server/auth/cookie';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const load = () => {
	/*
	TODO: double check status code
	*/
	redirect(308, '/dashboard/projects');
};

export const actions: Actions = {
	logout: async (event: RequestEvent) => {
		console.log('firing action');
		if (event.locals.session === null) {
			return fail(401);
		}

		await authService.invalidateSession(Number(event.locals.session.id));
		deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	},
};
