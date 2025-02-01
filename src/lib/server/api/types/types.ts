export const categories = [
	'background-painting',
	'visual-development',
	'playground',
] as const;

export type Category = (typeof categories)[number];
