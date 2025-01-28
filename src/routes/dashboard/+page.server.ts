import { DrizzleService } from '$lib/server/api/database/drizzle.service';
import { AuthService } from '$lib/server/auth/auth.service';
import { deleteSessionTokenCookie } from '$lib/server/auth/cookie';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

const { db } = new DrizzleService();
const authService = new AuthService(db);

export const load: PageServerLoad = async (event) => {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/login');
	}

	return {
		data: event.locals.user,
	};
};

export const actions: Actions = {
	default: action,
};

async function action(event: RequestEvent) {
	if (event.locals.session === null) {
		return fail(401);
	}

	await authService.invalidateSession(Number(event.locals.session.id));
	deleteSessionTokenCookie(event);
	return redirect(302, '/login');
}
