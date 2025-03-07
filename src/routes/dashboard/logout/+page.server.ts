import { STATUS_CODE } from '$lib/constants';
import { authService } from '$lib/server/auth/auth.service';
import { deleteSessionTokenCookie } from '$lib/server/auth/cookie';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	logout: async (event: RequestEvent) => {
		console.log('test');
		if (event.locals.session === null) {
			return fail(STATUS_CODE.UNAUTHORIZED);
		}

		await authService.invalidateSession(Number(event.locals.session.id));
		deleteSessionTokenCookie(event);
		return redirect(STATUS_CODE.REDIRECT, '/login');
	},
};
