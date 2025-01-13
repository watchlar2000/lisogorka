import type { IProjectRepository } from '$lib/server/repositories/project/project.types';
import type { Project } from '../types';

interface IProjectService {
	listAll: () => Promise<Project[]>;
	getById: (id: number) => Promise<Project>;
}

export class ProjectService implements IProjectService {
	private repository;

	constructor(repository: IProjectRepository) {
		this.repository = repository;
	}

	async listAll() {
		return this.repository.readAll();
	}

	async getById(id: number) {
		return this.repository.readById(id);
	}
}
