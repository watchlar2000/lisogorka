import type { RequestEvent } from '@sveltejs/kit';

export const setSessionTokenCookie = (
	event: RequestEvent,
	token: string,
	expiresAt: Date,
): void => {
	if (import.meta.env.PROD) {
		event.cookies.set('session', token, {
			httpOnly: true,
			sameSite: 'lax',
			expires: expiresAt,
			path: '/',
			secure: true, // Only set cookie over HTTPS in production mode.
		});
	} else {
		event.cookies.set('session', token, {
			httpOnly: true,
			sameSite: 'lax',
			expires: expiresAt,
			path: '/',
		});
	}
};

export const deleteSessionTokenCookie = (event: RequestEvent): void => {
	if (import.meta.env.PROD) {
		event.cookies.set('session', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
			path: '/',
			secure: true, // Only delete cookie over HTTPS in production mode.
		});
	} else {
		event.cookies.set('session', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
			path: '/',
		});
	}
};
