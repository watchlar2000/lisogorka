import { STATUS_CODE } from '$lib/constants';
import { authService } from '$lib/server/auth/auth.service';
import { COOKIE } from '$lib/server/auth/constants';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const { state, url, codeVerifier } = authService.generateOAuthDetails();

	const cookieOptions = {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		secure: import.meta.env.PROD,
		sameSite: 'lax' as const,
	};

	event.cookies.set(COOKIE.GOOGLE_OAUTH_STATE, state, cookieOptions);
	event.cookies.set(COOKIE.GOOGLE_CODE_VERIFIER, codeVerifier, cookieOptions);

	return new Response(null, {
		status: STATUS_CODE.REDIRECT,
		headers: {
			Location: url.toString(),
		},
	});
}
