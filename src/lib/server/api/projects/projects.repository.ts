import { desc, eq, getTableColumns } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { images, projects } from '../database/schema';
import type {
	NewProject,
	Project,
	ProjectWithCoverImage,
} from './projects.types';

export interface IProjectsRepository {
	listAll(where: Pick<Project, 'isFeatured'>): Promise<ProjectWithCoverImage[]>;
	findById(id: number): Promise<ProjectWithCoverImage | null>;
	create(data: NewProject): Promise<Project>;
	update(id: number, payload: Partial<NewProject>): Promise<Project>;
	deleteById(id: number): Promise<Project>;
}

export class ProjectsRepository<T extends Record<string, unknown>>
	implements IProjectsRepository
{
	db;

	constructor(db: PostgresJsDatabase<T>) {
		this.db = db;
	}

	async listAll(where: Pick<Project, 'isFeatured'>) {
		const { isFeatured } = where;

		const query = this.db
			.select({
				...getTableColumns(projects),
				coverImage: images,
			})
			.from(projects)
			.orderBy(desc(projects.createdAt))
			.leftJoin(images, eq(projects.coverImageId, images.id))
			.$dynamic();

		if (isFeatured) {
			return query.where(eq(projects.isFeatured, isFeatured));
		}

		return query.execute();
	}

	async findById(id: number) {
		const [found] = await this.db
			.select({
				...getTableColumns(projects),
				coverImage: images,
			})
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
