import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { type IImagesRepository } from './images.repository';
import { type Image } from './images.types';

export interface IImagesService {
	listAll: () => Promise<Image[]>;
	findById: (id: number) => Promise<Image>;
	findByIds(ids: number[]): Promise<Image[]>;
	create: (payload: { image: File; alt: string }) => Promise<Image>;
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
		return this.repository.listAll();
	}

	async findById(id: number) {
		return this.repository.findById(id);
	}

	async findByIds(ids: number[]) {
		return this.repository.findByIds(ids);
	}

	async create({ image, alt }: { image: File; alt: string }) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { public_id, width, height, secure_url } =
			await this.cloudinaryService.upload({
				image,
			});

		const payload = {
			url: secure_url,
			alt,
			width,
			height,
		};

		// const {
		// 	success,
		// 	data: values,
		// 	error,
		// } = imageInsertSchema.safeParse(payload);

		// if (!success) {
		// 	const { fieldErrors } = error.flatten();
		// 	const errorMessage = Object.entries(fieldErrors)
		// 		.map(([field, errors]) =>
		// 			errors ? `${field}: ${errors.join(', ')}` : field,
		// 		)
		// 		.join('\n  ');
		// 	throw new Error(errorMessage);
		// }

		return await this.repository.create(payload);
	}
}
