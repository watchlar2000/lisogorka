import { authService } from '$lib/server/auth/auth.service';
import { COOKIE } from '$lib/server/auth/constants';
import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
} from '$lib/server/auth/cookie';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(COOKIE.SESSION) ?? null;

	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await authService.validateSessionToken(token);

	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};
