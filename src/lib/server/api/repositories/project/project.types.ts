import type {
	Category,
	Project,
	ProjectInsert,
} from '$lib/server/api/database/types';
import type { IBaseRepository } from '../base/base.types';

// TODO implement other options
export type ProjectOptions = {
	isFeatured: boolean;
	orderBy: 'asc' | 'desc';
	limit: number;
	offset: number;
};

export interface IProjectRepository
	extends IBaseRepository<Project, ProjectInsert, ProjectOptions> {
	findBySlug?: (slug: string) => Promise<Project>;
	findByCategory?: (category: Category) => Promise<Project[]>;
}
