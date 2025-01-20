import { eq, sql } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { projects } from '../database/schema';
import type { NewProject, Project, ProjectWithImages } from './project.types';

export interface IProjectRepository {
	listAll(where: Pick<Project, 'isFeatured'>): Promise<ProjectWithImages[]>;
	findById(id: number): Promise<ProjectWithImages | null>;
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
		const rows = await this.db.execute(
			sql`
	      SELECT
	        p.*,
	        json_build_object(
	          'id', im1.id,
	          'url', im1.url,
	          'alt', im1.alt,
	          'width', im1.width,
	          'height', im1.height,
	          'created_at', im1.created_at,
	          'updated_at', im1.updated_at
	        ) AS cover_image,
	        json_agg(im2.*) AS images
	        FROM projects p
	        LEFT JOIN images im1 ON im1.id = p.cover_image_id
	        LEFT JOIN projects_to_images pti ON pti.project_id = p.id
	        LEFT JOIN images im2 ON im2.id = pti.image_id
          WHERE p.is_featured = COALESCE(${where.isFeatured}, p.is_featured)
	        GROUP BY
	          p.id,
	          im1.id;
	    `,
		);
		return rows as unknown as ProjectWithImages[];
	}

	async findById(id: number) {
		const [project] = await this.db.execute(
			sql`
	      SELECT
	        p.*,
	        json_build_object(
	          'id', im1.id,
	          'url', im1.url,
	          'alt', im1.alt,
	          'width', im1.width,
	          'height', im1.height,
	          'created_at', im1.created_at,
	          'updated_at', im1.updated_at
	        ) AS cover_image,
	        json_agg(im2.*) AS images
	        FROM projects p
	        LEFT JOIN images im1 ON im1.id = p.cover_image_id
	        LEFT JOIN projects_to_images pti ON pti.project_id = p.id
	        LEFT JOIN images im2 ON im2.id = pti.image_id
          WHERE p.id = ${id} AND p.is_featured = true
	        GROUP BY
	          p.id,
	          im1.id;
	    `,
		);
		return project ? (project as unknown as ProjectWithImages) : null;
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
