import type { Project, ProjectInsert, ProjectWithImages } from '../types/types';
import { titleToSlug } from '../utils/titleToSlug';
import { createProjectDTO } from './project.dto';
import { type IProjectRepository } from './project.repository';

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
	private repository;

	constructor(projectRepository: IProjectRepository) {
		this.repository = projectRepository;
	}

	async listAll(
		{ isFeatured }: { isFeatured?: boolean } = { isFeatured: undefined },
	) {
		if (isFeatured !== undefined) {
			return this.repository.listAllByIsFeatured({ isFeatured });
		}

		return this.repository.listAll();
	}

	async findById(id: number) {
		return this.repository.findById(id);
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

		return this.repository.create(projectData);
	}
}
