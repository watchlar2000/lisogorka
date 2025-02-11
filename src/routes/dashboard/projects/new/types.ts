import type { Category } from '$lib/server/api/types/types';

export type Image = {
	id: number;
	url: string;
	alt: string;
	file: File | null;
};

export type ProjectState = {
	title: string;
	description: string;
	category: Category;
	coverImage: Image | null;
	images: Image[];
};

export type OnSaveParams = {
	id?: number;
	isCoverImage?: boolean;
};
