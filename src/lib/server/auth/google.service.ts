import {
	GOOGLE_CLIENT_CALLBACK_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from '$env/static/private';
import { Google } from 'arctic';

export class GoogleService {
	client: Google;

	constructor() {
		this.client = new Google(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			GOOGLE_CLIENT_CALLBACK_URI,
		);
	}

	createAuthorizationURL(params: {
		state: string;
		codeVerifier: string;
		scopes: string[];
	}) {
		const { state, codeVerifier, scopes } = params;
		return this.client.createAuthorizationURL(state, codeVerifier, scopes);
	}
}

export const googleService = new GoogleService();
