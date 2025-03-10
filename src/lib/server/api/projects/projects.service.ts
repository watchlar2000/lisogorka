import {
	DatabaseError,
	NotFoundError,
	ValidationError,
} from '$lib/utils/errors';
import { titleToSlug } from '../utils/titleToSlug';
import { type IProjectsRepository } from './projects.repository';
import {
	projectInsertSchema,
	type NewProject,
	type Project,
} from './projects.types';

interface IProjectsService {
	listAll: (where?: { isFeatured: boolean | null }) => Promise<Project[]>;
	findById: (id: number) => Promise<Project>;
	findBySlug: (slug: string) => Promise<Project>;
	create: (payload: NewProject) => Promise<Project>;
	update: (id: number, payload: NewProject) => Promise<Project>;
}

export class ProjectsService implements IProjectsService {
	private projectRepository;

	constructor(projectRepository: IProjectsRepository) {
		this.projectRepository = projectRepository;
	}

	async listAll(
		where: {
			isFeatured: boolean | null;
		} = { isFeatured: null },
	) {
		try {
			return await this.projectRepository.listAll(where);
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw new DatabaseError(
				'Could not fetch projects. Please try again later.',
			);
		}
	}

	async findById(id: number) {
		try {
			const found = await this.projectRepository.findByIdOrSlug({ id });

			if (!found) {
				throw new NotFoundError(`Project with ID "${id}" not found.`);
			}

			return found;
		} catch (error) {
			console.error(`Error finding project with ID ${id}:`, error);
			throw error instanceof NotFoundError
				? error
				: new DatabaseError(
						'Failed to retrieve project. Please try again later.',
					);
		}
	}

	async findBySlug(slug: string) {
		try {
			const found = await this.projectRepository.findByIdOrSlug({ slug });

			if (!found) {
				throw new NotFoundError(`Project with slug "${slug}" not found.`);
			}

			return found;
		} catch (error) {
			throw error instanceof NotFoundError
				? error
				: new DatabaseError(
						'Failed to retrieve project. Please try again later.',
					);
		}
	}

	async create(payload: NewProject) {
		const validatedData = this.validateProjectData(payload);

		try {
			return await this.projectRepository.create({
				...validatedData,
				slug: titleToSlug(validatedData.title),
			});
		} catch (error) {
			console.error('Error creating project:', error);
			throw new DatabaseError(
				'Failed to create project. Please try again later.',
			);
		}
	}

	async update(id: number, payload: NewProject) {
		const validatedData = this.validateProjectData(payload);

		try {
			return this.projectRepository.update(id, {
				...validatedData,
				slug: titleToSlug(validatedData.title),
			});
		} catch (error) {
			console.error(`Error updating project with ID ${id}:`, error);
			throw new DatabaseError(
				'Failed to update project. Please try again later.',
			);
		}
	}

	private formatValidationErrors(fieldErrors: Record<string, string[]>) {
		return Object.entries(fieldErrors)
			.map(([field, errors]) =>
				errors ? `${field}: ${errors.join(', ')}` : field,
			)
			.join('\n');
	}

	private validateProjectData(payload: NewProject) {
		const {
			success,
			data: values,
			error,
		} = projectInsertSchema.safeParse(payload);

		if (!success) {
			const errorMessage = this.formatValidationErrors(
				error.flatten().fieldErrors,
			);
			throw new ValidationError(errorMessage);
		}

		return values;
	}
}
