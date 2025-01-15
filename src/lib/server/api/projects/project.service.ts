import type { Project, ProjectInsert, ProjectWithImages } from '../types/types';
import { titleToSlug } from '../utils/titleToSlug';
import { createProjectDTO } from './project.dto';
import {
	ProjectRepository,
	type IProjectRepository,
} from './project.repository';

interface IProjectService {
	listAll: ({
		isFeatured,
	}: {
		isFeatured?: boolean;
	}) => Promise<ProjectWithImages[]>;
	findById: (id: number) => Promise<ProjectWithImages>;
	create: (data: ProjectInsert) => Promise<Project>;
}

export class ProjectService implements IProjectService {
	constructor(
		private projectRepository: IProjectRepository = new ProjectRepository(),
	) {}

	async listAll(
		{ isFeatured }: { isFeatured?: boolean } = { isFeatured: undefined },
	) {
		if (isFeatured !== undefined) {
			return this.projectRepository.listAllByIsFeatured({ isFeatured });
		}

		return this.projectRepository.listAll();
	}

	async findById(id: number) {
		return this.projectRepository.findById(id);
	}

	async create(data: ProjectInsert) {
		const { success, data: values, error } = createProjectDTO.safeParse(data);

		if (!success) {
			const { fieldErrors } = error.flatten();
			const errorMessage = Object.entries(fieldErrors)
				.map(([field, errors]) =>
					errors ? `${field}: ${errors.join(', ')}` : field,
				)
				.join('\n  ');
			throw new Error(errorMessage);
		}

		const projectData = {
			title: values.title,
			slug: titleToSlug(values.title),
			description: values.description ?? '',
			category: values.category,
			isFeatured: values.isFeatured,
			coverImageId: parseInt(values.coverImageId, 10),
		};

		return this.projectRepository.create(projectData);
	}
}
