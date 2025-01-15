import type { Image } from '../types/types';
import { createImageDTO, type CreateImageDTO } from './image.dto';
import { ImageRepository, type IImageRepository } from './image.repository';

export interface IImageService {
	listAll: () => Promise<Image[]>;
	findById: (id: number) => Promise<Image>;
	create?: (data: CreateImageDTO) => Promise<null>;
}

export class ImageService implements IImageService {
	constructor(private repository: IImageRepository = new ImageRepository()) {}

	async listAll() {
		return this.repository.listAll();
	}

	async findById(id: number) {
		return this.repository.findById(id);
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
