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
			status: 400,
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	const { session, sessionToken } = await authService.authenticateWithGoogle({
		code,
		codeVerifier,
	});
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/dashboard',
		},
	});
}
