import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { projects } from '../database/schema';
import type { NewProject, Project } from './project.types';

export interface IProjectRepository {
	listAll(where: Pick<Project, 'isFeatured'>): Promise<Project[]>;
	findById(id: number): Promise<Project | null>;
	create(data: NewProject): Promise<Project>;
	update(id: number, payload: Partial<NewProject>): Promise<Project>;
	deleteById(id: number): Promise<Project>;
}

export class ProjectRepository<T extends Record<string, unknown>>
	implements IProjectRepository
{
	db;

	constructor(db: PostgresJsDatabase<T>) {
		this.db = db;
	}

	async listAll(where: Pick<Project, 'isFeatured'>) {
		const query = this.db.select().from(projects).$dynamic();

		if (where.isFeatured) {
			return query.where(eq(projects.isFeatured, where.isFeatured));
		}

		return query.execute();
	}

	async findById(id: number) {
		const [found] = await this.db
			.select()
			.from(projects)
			.where(eq(projects.id, id));
		return found ?? null;
	}

	async create(payload: NewProject) {
		const [project] = await this.db
			.insert(projects)
			.values(payload)
			.returning();

		return project;
	}

	async update(id: number, payload: Partial<NewProject>) {
		const [project] = await this.db
			.update(projects)
			.set(payload)
			.where(eq(projects.id, id))
			.returning();

		return project;
	}

	async deleteById(id: number) {
		const [project] = await this.db
			.delete(projects)
			.where(eq(projects.id, id))
			.returning();

		return project;
	}
}
