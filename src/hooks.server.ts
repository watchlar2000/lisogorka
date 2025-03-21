import { STATUS_CODE } from '$lib/constants';
import { TokenBucket } from '$lib/server/api/utils/rateLimit';
import { authService } from '$lib/server/auth/auth.service';
import { COOKIE } from '$lib/server/auth/constants';
import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
} from '$lib/server/auth/cookie';
import { NotFoundError } from '$lib/utils/errors';
import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const bucket = new TokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	const clientIP = event.request.headers.get('X-Forwarded-For');
	if (clientIP === null) {
		return resolve(event);
	}
	let cost: number;
	if (event.request.method === 'GET' || event.request.method === 'OPTIONS') {
		cost = 1;
	} else {
		cost = 3;
	}
	if (!bucket.consume(clientIP, cost)) {
		return new Response('Too many requests', {
			status: STATUS_CODE.TOO_MANY_REQUESTS,
		});
	}
	return resolve(event);
};

export const authHandle: Handle = async ({ event, resolve }) => {
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

export const handleError: HandleServerError = async ({
	error,
	event,
	status,
}) => {
	console.error({
		error,
		event,
		status,
	});
	return {
		message: error?.message ?? 'Something went wrong',
		status: error instanceof NotFoundError ? 404 : status,
	};
};

export const handle = sequence(rateLimitHandle, authHandle);
