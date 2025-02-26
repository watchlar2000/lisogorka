import type { Image } from '$lib/server/api/images/images.types';
import { sendRequest } from '$lib/utils/sendRequest';

type HandleSubmit<T> = {
	payload: T;
	options: { action: string };
};

type SubmitImagePayload = {
	id: number;
	alt: string;
	file?: File;
};

type ImageId = { id: number };

type HandleSubmitImage = HandleSubmit<SubmitImagePayload>;
type HandleDeleteImage = HandleSubmit<ImageId>;

export const handleSubmitImage = async ({
	payload,
	options,
}: HandleSubmitImage) => {
	const fd = new FormData();
	const { id, alt, file } = payload;
	const { action } = options;
	fd.append('id', String(id));
	fd.append('alt', alt);

	if (file) {
		fd.append('file', file);
	}

	const { result } = await sendRequest({
		body: fd,
		options: { action, method: 'POST' },
	});

	if (!result) return { image: null };

	return { image: result.data?.image as Image };
};

export const handleDeleteImage = async ({
	payload,
	options,
}: HandleDeleteImage) => {
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
