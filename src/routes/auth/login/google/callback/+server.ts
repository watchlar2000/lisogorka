import { STATUS_CODE } from '$lib/constants';
import { authService } from '$lib/server/auth/auth.service';
import { CODE, COOKIE, STATE } from '$lib/server/auth/constants';
import { setSessionTokenCookie } from '$lib/server/auth/cookie';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get(CODE);
	const state = event.url.searchParams.get(STATE);
	const storedState = event.cookies.get(COOKIE.GOOGLE_OAUTH_STATE) ?? null;
	const codeVerifier = event.cookies.get(COOKIE.GOOGLE_CODE_VERIFIER) ?? null;

	if (
		code === null ||
		state === null ||
		storedState === null ||
		codeVerifier === null
	) {
		return new Response(null, {
			status: STATUS_CODE.BAD_REQUEST,
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: STATUS_CODE.BAD_REQUEST,
		});
	}

	const { session, sessionToken } = await authService.authenticateWithGoogle({
		code,
		codeVerifier,
	});

	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: STATUS_CODE.REDIRECT,
		headers: {
			Location: '/dashboard',
		},
	});
}
