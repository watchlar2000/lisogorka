import type { images, projects } from '../database/schema';

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export type ProjectWithImages = Project & {
	coverImage: Image;
	images: Image[];
};

export type Image = typeof images.$inferSelect;
export type ImageInsert = typeof images.$inferInsert;

export const categories = [
	'background-painting',
	'visual-development',
	'playground',
] as const;

export type Category = (typeof categories)[number];
