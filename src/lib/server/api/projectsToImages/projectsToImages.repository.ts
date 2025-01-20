import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { projectsToImages } from '../database/schema';
import type {
	NewProjectToImage,
	ProjectToImage,
} from './projectsToImages.types';

export interface IProjectsToImagesRepository {
	createRelation(payload: NewProjectToImage): Promise<ProjectToImage>;
}

export class ProjectsToImagesRepository<T extends Record<string, unknown>>
	implements IProjectsToImagesRepository
{
	db;

	constructor(db: PostgresJsDatabase<T>) {
		this.db = db;
	}

	async createRelation(payload: NewProjectToImage) {
		const [relation] = await this.db
			.insert(projectsToImages)
			.values(payload)
			.returning();
		return relation;
	}
}
