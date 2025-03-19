import { DatabaseError } from '$lib/utils/errors';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { images, projects } from '../database/schema';
import type {
	NewProject,
	Project,
	ProjectWithCoverImage,
} from './projects.types';

export interface IProjectsRepository {
	listAll(where: {
		isFeatured: boolean | null;
	}): Promise<ProjectWithCoverImage[]>;
	findByIdOrSlug(params: {
		id?: number;
		slug?: string;
	}): Promise<ProjectWithCoverImage | null>;
	create(payload: NewProject): Promise<Project>;
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

	async listAll(where: { isFeatured: boolean | null }) {
		const { isFeatured } = where;
		try {
			const query = this.db
				.select({
					...getTableColumns(projects),
					coverImage: images,
				})
				.from(projects)
				.orderBy(desc(projects.createdAt))
				.leftJoin(images, eq(projects.coverImageId, images.id))
				.$dynamic();

			if (isFeatured !== null) {
				return query.where(eq(projects.isFeatured, isFeatured));
			}

			return query.execute();
		} catch (error) {
			throw new DatabaseError('Could not retrieve projects.', error);
		}
	}

	async findByIdOrSlug(params: { id: number; slug: string }) {
		const { id, slug } = params;
		const whereCondition = id ? eq(projects.id, id) : eq(projects.slug, slug);
		try {
			const [found] = await this.db
				.select({
					...getTableColumns(projects),
					coverImage: images,
				})
				.from(projects)
				.leftJoin(images, eq(projects.coverImageId, images.id))
				.where(whereCondition);
			return found ?? null;
		} catch (error) {
			throw new DatabaseError(
				`Could not find project by ${params.id ? `ID ${params.id}` : `slug "${params.slug}"`}.`,
				error,
			);
		}
	}

	async create(payload: NewProject) {
		try {
			const [project] = await this.db
				.insert(projects)
				.values(payload)
				.returning();
			return project;
		} catch (error) {
			throw new DatabaseError('Failed to create a new project.', error);
		}
	}

	async update(id: number, payload: Partial<NewProject>) {
		try {
			const [project] = await this.db
				.update(projects)
				.set(payload)
				.where(eq(projects.id, id))
				.returning();
			return project;
		} catch (error) {
			throw new DatabaseError(`Could not update project with ID ${id}.`, error);
		}
	}

	async deleteById(id: number) {
		try {
			const [project] = await this.db
				.delete(projects)
				.where(eq(projects.id, id))
				.returning();
			return project;
		} catch (error) {
			throw new DatabaseError(`Could not delete project with ID ${id}.`, error);
		}
	}
}
