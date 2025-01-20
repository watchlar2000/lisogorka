import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z as zod } from 'zod';
import { projectsToImages } from '../database/schema';

export const projectsToImagesSelectSchema =
	createSelectSchema(projectsToImages);
export const projectsToImagesInsertSchema =
	createInsertSchema(projectsToImages);

export type ProjectToImage = zod.infer<typeof projectsToImagesSelectSchema>;
export type NewProjectToImage = zod.infer<typeof projectsToImagesInsertSchema>;
