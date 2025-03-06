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
		return this.repository.listAll();
	}

	async findById(id: number) {
		return this.repository.findById(id);
	}

	async findByIds(ids: number[]) {
		return this.repository.findByIds(ids);
	}

	async create({ file, alt }: UpdateImageParams) {
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
	}
	async update(id: number, { file, alt }: Partial<UpdateImageParams>) {
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

		return this.repository.update(id, payload);
	}

	async delete(id: number) {
		// TODO: remove image from cloudinary
		return this.repository.delete(id);
	}
}
