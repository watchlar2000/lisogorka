import { categories } from '$lib/constants';
import type { Category } from '$lib/types/common';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is Category => {
	return categories.includes(param.slice(0) as Category);
}) satisfies ParamMatcher;
