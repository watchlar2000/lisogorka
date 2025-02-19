import { categories } from '$lib/constants';
import { z } from 'zod';

export const ProjectFormInputSchema = z.object({
	title: z.string().min(3, {
		message: 'Title is required and should be at least 3 characters long',
	}),
	description: z.string().optional(),
	category: z.enum(categories, { message: 'Select one of the categories' }),
});
