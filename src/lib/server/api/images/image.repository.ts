import { eq } from 'drizzle-orm';
import { DrizzleRepository } from '../database/drizzle.respository';
import { images } from '../database/schema';
import type { Image, ImageInsert } from '../types/types';

export interface IImageRepository {
	listAll(): Promise<Image[]>;
	findById(id: number): Promise<Image>;
	create(data: ImageInsert): Promise<Image>;
}

export class ImageRepository
	extends DrizzleRepository
	implements IImageRepository
{
	protected db = this.drizzle.db;

	async listAll() {
		return this.db.select().from(images);
	}

	async findById(id: number) {
		const rows = await this.db.select().from(images).where(eq(images.id, id));
		if (!rows.length) throw Error('Image not found');
		return rows[0];
	}

	async create(data: ImageInsert) {
		try {
			const rows = await this.db.insert(images).values(data);
			return rows[0];
		} catch (error) {
			console.error(error.message);
			throw Error('Failed to create project');
		}
	}
}
