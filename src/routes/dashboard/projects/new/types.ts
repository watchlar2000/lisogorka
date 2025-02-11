import type { Category } from '$lib/server/api/types/types';
import type { ProjectImageData } from '$lib/types/new-project';

export type ProjectState = {
	title: string;
	description: string;
	category: Category;
	coverImage: ProjectImageData | null;
	images: ProjectImageData[];
};

export type OnSaveParams = {
	id?: number;
	isCoverImage?: boolean;
};
