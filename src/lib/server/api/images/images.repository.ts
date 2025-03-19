import { DatabaseError } from '$lib/utils/errors';
import { eq, inArray } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { images } from '../database/schema';
import type { Image, NewImage } from './images.types';

export interface IImagesRepository {
	listAll(): Promise<Image[]>;
	findById(id: number): Promise<Image>;
	findByIds(ids: number[]): Promise<Image[]>;
	create(payload: NewImage): Promise<Image>;
	update(id: number, payload: Partial<Image>): Promise<Image>;
	delete(id: number): Promise<Image>;
}

export class ImagesRepository implements IImagesRepository {
	db;

	constructor(db: PostgresJsDatabase<Record<string, unknown>>) {
		this.db = db;
	}

	async listAll() {
		try {
			return await this.db.select().from(images);
		} catch (error) {
			throw new DatabaseError('Could not retrieve images.', error);
		}
	}

	async findById(id: number) {
		try {
			const [image] = await this.db
				.select()
				.from(images)
				.where(eq(images.id, id));
			return image;
		} catch (error) {
			throw new DatabaseError(`Could not find image with ID ${id}.`, error);
		}
	}

	async findByIds(ids: number[]) {
		try {
			return await this.db.select().from(images).where(inArray(images.id, ids));
		} catch (error) {
			throw new DatabaseError(`Could not find images by IDs provided.`, error);
		}
	}

	async create(payload: NewImage) {
		try {
			const [image] = await this.db.insert(images).values(payload).returning();
			return image;
		} catch (error) {
			throw new DatabaseError('Failed to create a new image.', error);
		}
	}

	async update(id: number, payload: Partial<Image>) {
		try {
			const [image] = await this.db
				.update(images)
				.set(payload)
				.where(eq(images.id, id))
				.returning();
			return image;
		} catch (error) {
			throw new DatabaseError(`Could not update image with ID ${id}.`, error);
		}
	}

	async delete(id: number) {
		try {
			const [image] = await this.db
				.delete(images)
				.where(eq(images.id, id))
				.returning();
			return image;
		} catch (error) {
			throw new DatabaseError(`Could not delete image with ID ${id}.`, error);
		}
	}
}
