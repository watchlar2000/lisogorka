import type { ParamMatcher } from '@sveltejs/kit';

const categories = [
	'playground',
	'visual-development',
	'background-painting',
] as const;

type Category = (typeof categories)[number];

export const match = ((param: string): param is Category => {
	return categories.includes(param.slice(0) as Category);
}) satisfies ParamMatcher;
