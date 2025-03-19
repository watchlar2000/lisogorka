import { DatabaseError, NotFoundError } from '$lib/utils/errors';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { type IImagesRepository } from './images.repository';
import { type Image } from './images.types';

type UpdateImageParams = {
	file: File;
	alt: string;
};

export interface IImagesService {
	listAll: () => Promise<Image[]>;
	findById: (id: number) => Promise<Image>;
	findByIds(ids: number[]): Promise<Image[]>;
	create: (payload: UpdateImageParams) => Promise<Image>;
	update: (id: number, payload: Partial<UpdateImageParams>) => Promise<Image>;
	delete: (id: number) => Promise<Image>;
}

export class ImagesService implements IImagesService {
	private repository;
	private cloudinaryService;

	constructor(
		imageRepository: IImagesRepository,
		cloudinaryService: CloudinaryService,
	) {
		this.repository = imageRepository;
		this.cloudinaryService = cloudinaryService;
	}

	async listAll() {
		try {
			return await this.repository.listAll();
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw new DatabaseError(
				'Could not fetch images. Please try again later.',
			);
		}
	}

	async findById(id: number) {
		try {
			const found = await this.repository.findById(id);

			if (!found) {
				throw new NotFoundError(`Image with ID "${id}" not found.`);
			}

			return found;
		} catch (error) {
			console.error(`Error finding image with ID ${id}:`, error);
			throw error instanceof NotFoundError
				? error
				: new DatabaseError(
						'Failed to retrieve image. Please try again later.',
					);
		}
	}

	async findByIds(ids: number[]) {
		try {
			return await this.repository.findByIds(ids);
		} catch (error) {
			console.error('Error fetching images by IDs provided:', error);
			throw new DatabaseError(
				'Could not fetch images. Please try again later.',
			);
		}
	}

	async create({ file, alt }: UpdateImageParams) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { public_id, width, height, secure_url } =
				await this.cloudinaryService.upload({
					image: file,
				});

			const payload = {
				url: secure_url,
				alt,
				width,
				height,
			};

			return await this.repository.create(payload);
		} catch (error) {
			console.error('Error creating image:', error);
			throw new DatabaseError(
				'Failed to create image. Please try again later.',
			);
		}
	}
	async update(id: number, { file, alt }: Partial<UpdateImageParams>) {
		try {
			const cloudinaryImage = file
				? await this.cloudinaryService.upload({
						image: file,
					})
				: null;

			const payload = {
				alt,
				...(cloudinaryImage && {
					url: cloudinaryImage.secure_url,
					width: cloudinaryImage.width,
					height: cloudinaryImage.height,
				}),
			};

			return await this.repository.update(id, payload);
		} catch (error) {
			console.error('Error updating image:', error);
			throw new DatabaseError(
				'Failed to update image. Please try again later.',
			);
		}
	}

	async delete(id: number) {
		try {
			// TODO: remove image from cloudinary
			return await this.repository.delete(id);
		} catch (error) {
			console.error('Error deleting image:', error);
			throw new DatabaseError(
				'Failed to delete image. Please try again later.',
			);
		}
	}
}
