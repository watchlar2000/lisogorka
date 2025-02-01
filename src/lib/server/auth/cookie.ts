import type { RequestEvent } from '@sveltejs/kit';
import { COOKIE } from './constants';

export const setSessionTokenCookie = (
	event: RequestEvent,
	token: string,
	expiresAt: Date,
): void => {
	if (import.meta.env.PROD) {
		event.cookies.set(COOKIE.SESSION, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			expires: expiresAt,
			secure: true, // Only set cookie over HTTPS in production mode.
		});
	} else {
		event.cookies.set(COOKIE.SESSION, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			expires: expiresAt,
		});
	}
};

export const deleteSessionTokenCookie = (event: RequestEvent): void => {
	if (import.meta.env.PROD) {
		event.cookies.set(COOKIE.SESSION, '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
			secure: true, // Only delete cookie over HTTPS in production mode.
		});
	} else {
		event.cookies.set(COOKIE.SESSION, '', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
		});
	}
};
