import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z as zType, z } from 'zod';
import { projects } from '../database/schema';
import type { Image } from '../images/images.types';

export const projectSelectSchema = createSelectSchema(projects);
export const projectInsertSchema = createInsertSchema(projects, {
	title: ProjectFormInputSchema.shape.title,
	slug: z.string().optional(),
	category: ProjectFormInputSchema.shape.category,
	coverImageId: z.number().optional(),
});

export type Project = zType.infer<typeof projectSelectSchema>;
export type NewProject = zType.infer<typeof projectInsertSchema>;

export type ProjectWithCoverImage = Project & {
	coverImage: Image | null;
};
