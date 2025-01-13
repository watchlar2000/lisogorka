import type { authors, images, projects } from './schema';

export type Author = typeof authors.$inferSelect;
export type AuthorInsert = typeof authors.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export type Image = typeof images.$inferSelect;
export type ImageInsert = typeof images.$inferInsert;

export const categories = [
	'background-painting',
	'visual-development',
	'playground',
] as const;

export type Category = (typeof categories)[number];
