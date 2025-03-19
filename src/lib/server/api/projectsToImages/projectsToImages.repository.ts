import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { projectsToImages } from '../database/schema';
import type { ProjectToImage } from './projectsToImages.types';

export interface IProjectsToImagesRepository {
	createRelation(payload: ProjectToImage): Promise<ProjectToImage>;
	getRelatedImageIds(projectId: number): Promise<ProjectToImage[]>;
}

export class ProjectsToImagesRepository<T extends Record<string, unknown>>
	implements IProjectsToImagesRepository
{
	db;

	constructor(db: PostgresJsDatabase<T>) {
		this.db = db;
	}

	async createRelation(payload: ProjectToImage) {
		const [relation] = await this.db
			.insert(projectsToImages)
			.values(payload)
			.onConflictDoNothing()
			.returning();
		return relation;
	}

	async getRelatedImageIds(projectId: number) {
		return await this.db
			.select()
			.from(projectsToImages)
			.where(eq(projectsToImages.projectId, projectId));
	}
}
