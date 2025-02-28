import type { RequestEvent } from '@sveltejs/kit';

export type ActionRequestEvent = RequestEvent<
	Partial<Record<string, string>>,
	string | null
>;
