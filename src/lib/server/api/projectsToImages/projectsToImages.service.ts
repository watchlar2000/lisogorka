import type { IProjectsToImagesRepository } from './projectsToImages.repository';
import type { ProjectToImage } from './projectsToImages.types';

interface IProjectsToImagesService {
	createRelation(payload: ProjectToImage): Promise<ProjectToImage>;
	getRelatedImageIds(projectId: number): Promise<number[]>;
}

export class ProjectsToImagesService implements IProjectsToImagesService {
	private repository;

	constructor(repository: IProjectsToImagesRepository) {
		this.repository = repository;
	}

	async createRelation(payload: ProjectToImage) {
		return this.repository.createRelation(payload);
	}

	async getRelatedImageIds(projectId: number) {
		return await this.repository
			.getRelatedImageIds(projectId)
			.then((result) => result.map((r) => r.imageId));
	}
}
