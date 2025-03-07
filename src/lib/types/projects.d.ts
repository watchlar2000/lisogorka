import type { Category } from '$lib/types/common';

export type Project = {
	id: number;
	title: string;
	// slug: string;
	description: string;
	category: Category;
	createdAt?: Date;
	updatedAt?: Date;
	// coverImageId: number;
	// isFeatured: boolean;
};
