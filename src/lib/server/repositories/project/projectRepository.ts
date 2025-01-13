import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { projects } from '../../db/schema';
import { BaseRepository } from '../base/baseRepository';
import type { IProjectRepository, ProjectOptions } from './project.types';

export class ProjectRepository
	extends BaseRepository<typeof projects, ProjectOptions>
	implements IProjectRepository
{
	constructor(db: PostgresJsDatabase<Record<string, unknown>>) {
		super(db, projects);
	}
}
