import { eq, inArray } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { images } from '../database/schema';
import type { Image, NewImage } from './images.types';

export interface IImagesRepository {
	listAll(): Promise<Image[]>;
	findById(id: number): Promise<Image>;
	findByIds(ids: number[]): Promise<Image[]>;
	create(data: NewImage): Promise<Image>;
}

export class ImagesRepository implements IImagesRepository {
	db;

	constructor(db: PostgresJsDatabase<Record<string, unknown>>) {
		this.db = db;
	}

	async listAll() {
		return this.db.select().from(images);
	}

	async findById(id: number) {
		const [image] = await this.db
			.select()
			.from(images)
			.where(eq(images.id, id));

		return image;
	}

	async findByIds(ids: number[]) {
		return this.db.select().from(images).where(inArray(images.id, ids));
	}

	async create(payload: NewImage) {
		const [image] = await this.db.insert(images).values(payload);
		return image;
	}
}
