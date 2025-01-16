import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleService } from './database/drizzle.service';
import { ImageRepository } from './images/image.repository';
import { ImageService } from './images/image.service';
import { ProjectRepository } from './projects/project.repository';
import { ProjectService } from './projects/project.service';

const { db } = new DrizzleService();

const serviceFactory =
	(db: PostgresJsDatabase<Record<string, unknown>>) =>
	<T, U>(
		Repo: new (db: PostgresJsDatabase<Record<string, unknown>>) => T,
		Service: new (repo: T) => U,
	): U => {
		const repository = new Repo(db);
		return new Service(repository);
	};

const drizzleFactory = serviceFactory(db);
const projectService = drizzleFactory(ProjectRepository, ProjectService);
const imageService = drizzleFactory(ImageRepository, ImageService);

export const routing = {
	projects: projectService,
	images: imageService,
};
