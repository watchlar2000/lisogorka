import type { IProjectsToImagesRepository } from './projectsToImages.repository';
import type {
	NewProjectToImage,
	ProjectToImage,
} from './projectsToImages.types';

interface IProjectsToImagesService {
	createRelation(payload: NewProjectToImage): Promise<ProjectToImage>;
}

export class ProjectsToImagesService implements IProjectsToImagesService {
	private repository;

	constructor(repository: IProjectsToImagesRepository) {
		this.repository = repository;
	}

	async createRelation(payload: NewProjectToImage) {
		return await this.repository.createRelation(payload);
	}
}
