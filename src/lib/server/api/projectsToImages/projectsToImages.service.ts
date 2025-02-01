import type { IImagesService } from '../images/images.service';
import type { Image } from '../images/images.types';
import type { IProjectsToImagesRepository } from './projectsToImages.repository';
import type { ProjectToImage } from './projectsToImages.types';

interface IProjectsToImagesService {
	createRelation(payload: ProjectToImage): Promise<ProjectToImage>;
	getRelatedImages(projectId: number): Promise<Image[]>;
}

export class ProjectsToImagesService implements IProjectsToImagesService {
	private repository;
	private imagesService;

	constructor(
		repository: IProjectsToImagesRepository,
		imagesService: IImagesService,
	) {
		this.repository = repository;
		this.imagesService = imagesService;
	}

	async createRelation(payload: ProjectToImage) {
		return this.repository.createRelation(payload);
	}

	async getRelatedImages(projectId: number) {
		return await this.repository
			.getRelatedImageIds(projectId)
			.then((result) => result.map((r) => r.imageId))
			.then((ids) => this.imagesService.findByIds(ids));
	}
}
