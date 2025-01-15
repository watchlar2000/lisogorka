import { z } from 'zod';
import { imageDTO } from '../images/image.dto';
import { categories } from '../types/types';

export const projectDTO = z.object({
	id: z.string(),
	title: z.string().min(1),
	slug: z.string().min(1),
	description: z.string(),
	category: z.enum(categories),
	isFeatured: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createProjectDTO = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title must be at least 1 character long',
		})
		.min(1),
	description: z.string().optional(),
	category: z.enum(categories),
	isFeatured: z.boolean().default(true),
	coverImageId: z.string(),
});

export const projectWithImagesDTO = projectDTO.extend({
	coverImage: imageDTO,
	images: z.array(imageDTO),
});

export type ProjectDTO = z.infer<typeof projectDTO>;
export type CreateProjectDTO = z.infer<typeof createProjectDTO>;
export type ProjectWithImagesDTO = z.infer<typeof projectWithImagesDTO>;
