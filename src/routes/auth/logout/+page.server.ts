import { STATUS_CODE } from '$lib/constants';
import { authService } from '$lib/server/auth/auth.service';
import { deleteSessionTokenCookie } from '$lib/server/auth/cookie';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async (event) => {
		if (event.locals.session === null) {
			return fail(STATUS_CODE.UNAUTHORIZED);
		}

		await authService.invalidateSession(Number(event.locals.session.id));
		deleteSessionTokenCookie(event);
		return redirect(STATUS_CODE.REDIRECT, '/auth/login');
	},
};
