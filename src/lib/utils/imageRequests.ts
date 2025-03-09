import type { Image } from '$lib/server/api/images/images.types';
import { sendRequest } from '$lib/utils/sendRequest';

type SendRequest<T> = {
	payload: T;
	options: { action: string };
};

type SendImagePayload = {
	id: number;
	alt: string;
	file?: File;
};

type ImageId = { id: number };

type SubmitImageParams = SendRequest<SendImagePayload>;
type RemoveImageParams = SendRequest<ImageId>;

export const submitImage = async ({ payload, options }: SubmitImageParams) => {
	const fd = new FormData();
	const { id, alt, file } = payload;
	const { action } = options;
	fd.append('id', String(id));
	fd.append('alt', alt);

	if (file) {
		fd.append('file', file);
	}

	try {
		const { result } = await sendRequest({
			body: fd,
			options: { action, method: 'POST' },
		});

		if (!result) return { image: null };

		return { image: result.data?.image as Image, errors: null };
	} catch (error) {
		return { image: null, errors: error.message };
	}
};

export const removeImage = async ({ payload, options }: RemoveImageParams) => {
	const fd = new FormData();
	const { id } = payload;
	const { action } = options;
	fd.append('id', String(id));
	const { result } = await sendRequest({
		body: fd,
		options: { action, method: 'POST' },
	});

	if (!result) return { image: null };

	return { image: result.data?.image as Image };
};
