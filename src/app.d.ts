// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session, User } from '$lib/server/auth/auth.types';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
		}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
