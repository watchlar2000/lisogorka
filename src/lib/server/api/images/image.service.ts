import { type IImageRepository } from './image.repository';
import { createImageDTO, type CreateImageDTO, type Image } from './image.types';

export interface IImageService {
	listAll: () => Promise<Image[]>;
	findById: (id: number) => Promise<Image>;
	findByIds(ids: number[]): Promise<Image[]>;
	create?: (data: CreateImageDTO) => Promise<null>;
}

export class ImageService implements IImageService {
	private repository;

	constructor(imageRepository: IImageRepository) {
		this.repository = imageRepository;
	}

	async listAll() {
		return this.repository.listAll();
	}

	async findById(id: number) {
		return this.repository.findById(id);
	}

	async findByIds(ids: number[]) {
		return this.repository.findByIds(ids);
	}

	async create(data: CreateImageDTO) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { success, data: values, error } = createImageDTO.safeParse(data);

		if (!success) {
			const { fieldErrors } = error.flatten();
			const errorMessage = Object.entries(fieldErrors)
				.map(([field, errors]) =>
					errors ? `${field}: ${errors.join(', ')}` : field,
				)
				.join('\n  ');
			throw new Error(errorMessage);
		}

		/*
		 TODO:
      - get metadata from from (height, width)
      - upload file to the storage (supabase or cloudinary?) and return url
      - map input values to an object to be passed to repository create method
    */

		return Promise.resolve(null);
	}
}
