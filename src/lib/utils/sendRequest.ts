import { applyAction, deserialize } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import { SUCCESS } from '$lib/constants';
import type { ActionResult } from '@sveltejs/kit';

type HandleSubmitHelperParams<T extends FormData> = {
	body: T;
	options: { action: string; method: 'POST' | 'DELETE' };
};

export const sendRequest = async <T extends FormData>({
	body,
	options,
}: HandleSubmitHelperParams<T>) => {
	const response = await fetch(options.action, {
		method: options.method,
		body,
	});

	const result: ActionResult = deserialize(await response.text());

	if (result.type === SUCCESS) {
		await invalidateAll();
		applyAction(result);

		return { result };
	}

	return { result: null };
};
