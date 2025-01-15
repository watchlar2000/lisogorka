import { sql } from 'drizzle-orm';
import { DrizzleRepository } from '../database/drizzle.respository';
import { projects } from '../database/schema';
import type { ProjectInsert, ProjectWithImages } from '../types/types';

export interface IProjectRepository {
	listAll(): Promise<ProjectWithImages[]>;
	listAllByIsFeatured({
		isFeatured,
	}: {
		isFeatured: boolean;
	}): Promise<ProjectWithImages[]>;
	findById(id: number): Promise<ProjectWithImages>;
	create(data: ProjectInsert): Promise<ProjectWithImages>;
	update?(id: number, data: ProjectInsert): Promise<ProjectWithImages>;
}

export class ProjectRepository
	extends DrizzleRepository
	implements IProjectRepository
{
	protected db = this.drizzle.db;

	async listAll() {
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
          GROUP BY
            p.id,
            im1.id;
      `,
		);
		return rows as unknown as ProjectWithImages[];
	}

	async listAllByIsFeatured({ isFeatured }: { isFeatured: true }) {
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
          WHERE p.is_featured = ${isFeatured}
          GROUP BY
            p.id,
            im1.id;
      `,
		);
		return rows as unknown as ProjectWithImages[];
	}

	async findById(id: number) {
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
          WHERE p.id = ${id}
          GROUP BY
            p.id,
            im1.id;
      `,
		);

		if (!rows.length) throw Error('Project not found');

		return rows[0] as unknown as Promise<ProjectWithImages>;
	}

	async create(data: ProjectInsert) {
		try {
			const rows = await this.db.insert(projects).values(data);
			return rows[0];
		} catch (error) {
			console.error(error.message);
			throw Error('Failed to create project');
		}
	}
}
