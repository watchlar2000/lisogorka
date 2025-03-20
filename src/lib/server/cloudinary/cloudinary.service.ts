import { config } from '$lib/server/api/configs/config';
import { NotFoundError, ValidationError } from '$lib/utils/errors';
import { v2 as cloudinary } from 'cloudinary';

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
			const result = await this.client.uploader.upload(dataUri, {
				upload_preset: uploadPreset,
			});

			if (!result || !result.public_id) {
				throw new ValidationError('Upload to Cloudinary failed');
			}

			return result;
		} catch (error: unknown) {
			throw new ValidationError(
				`Cloudinary upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
				error,
			);
		}
	}

	async deleteByPublicId(publicId: string): Promise<void> {
		if (!publicId) {
			throw new ValidationError('Public ID must be provided');
		}

		try {
			const result = await this.client.uploader.destroy(publicId);

			if (result.result !== 'ok') {
				throw new NotFoundError(
					`Failed to delete Cloudinary image with public ID: ${publicId}`,
				);
			}
		} catch (error: unknown) {
			throw new NotFoundError(
				`Failed to delete Cloudinary image: ${error instanceof Error ? error.message : 'Unknown error'}`,
				error,
			);
		}
	}
}

export const cloudinaryService = new CloudinaryService();
