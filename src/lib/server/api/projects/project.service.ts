import { titleToSlug } from '../utils/titleToSlug';
import { type IProjectRepository } from './project.repository';
import {
	projectInsertSchema,
	type NewProject,
	type Project,
} from './project.types';

interface IProjectService {
	listAll: (where?: Pick<Project, 'isFeatured'>) => Promise<Project[]>;
	findById?: (id: number) => Promise<Project>;
	create: (payload: NewProject) => Promise<Project>;
	update: (id: number, payload: NewProject) => Promise<Project>;
}

export class ProjectService implements IProjectService {
	private projectRepository;

	constructor(projectRepository: IProjectRepository) {
		this.projectRepository = projectRepository;
	}

	async listAll(where: Pick<Project, 'isFeatured'> = { isFeatured: null }) {
		return this.projectRepository.listAll(where);
	}

	async findById(id: number) {
		const found = await this.projectRepository.findById(id);

		if (!found) {
			throw new Error('Project not found');
		}

		return found;
	}

	async create(payload: NewProject & { slug?: string }) {
		const {
			success,
			data: values,
			error,
		} = projectInsertSchema.safeParse(payload);

		if (!success) {
			const { fieldErrors } = error.flatten();
			const errorMessage = Object.entries(fieldErrors)
				.map(([field, errors]) =>
					errors ? `${field}: ${errors.join(', ')}` : field,
				)
				.join('\n');
			throw new Error(errorMessage);
		}

		return this.projectRepository.create({
			...values,
			slug: titleToSlug(values.title),
		});
	}

	async update(id: number, payload: NewProject & { slug?: string }) {
		const {
			success,
			data: values,
			error,
		} = projectInsertSchema.safeParse(payload);

		if (!success) {
			const { fieldErrors } = error.flatten();
			const errorMessage = Object.entries(fieldErrors)
				.map(([field, errors]) =>
					errors ? `${field}: ${errors.join(', ')}` : field,
				)
				.join('\n');
			throw new Error(errorMessage);
		}

		return this.projectRepository.update(id, {
			...values,
			slug: titleToSlug(values.title),
		});
	}
}
