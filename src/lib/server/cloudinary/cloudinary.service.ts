import { v2 as cloudinary } from 'cloudinary';
import { config } from '../api/configs/config';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
	config.envs;

const cloudinaryConfig = {
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true,
} as const;

export class CloudinaryService {
	private client;

	constructor(
		client: typeof cloudinary = cloudinary,
		config: typeof cloudinaryConfig = cloudinaryConfig,
	) {
		this.client = client;
		this.client.config(config);
	}

	async upload({
		image,
		uploadPreset = 'lisogorka',
	}: {
		image: File;
		uploadPreset?: string;
	}) {
		try {
			const arrayBuffer = await image.arrayBuffer();
			const base64String = Buffer.from(arrayBuffer).toString('base64');
			const dataUri = `data:${image.type};base64,${base64String}`;

			return await this.client.uploader.upload(dataUri, {
				upload_preset: uploadPreset,
			});
		} catch (error: unknown) {
			throw new Error(`Cloudinary upload failed: ${error?.message}`);
		}
	}

	async deleteByPublicId(publicId: string): Promise<void> {
		try {
			await this.client.uploader.destroy(publicId);
		} catch (error: unknown) {
			throw new Error(`Failed to delete Cloudinary image: ${error?.message}`);
		}
	}
}

export const cloudinaryService = new CloudinaryService();
