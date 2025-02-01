import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z as zod, z } from 'zod';
import { projects } from '../database/schema';
import type { Image } from '../images/images.types';

export const projectSelectSchema = createSelectSchema(projects);
export const projectInsertSchema = createInsertSchema(projects, {
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: "Title can't be blank",
		})
		.min(1),
});

export type Project = zod.infer<typeof projectSelectSchema>;
export type NewProject = zod.infer<typeof projectInsertSchema>;

export type ProjectWithCoverImage = Project & {
	coverImage: Image | null;
};
