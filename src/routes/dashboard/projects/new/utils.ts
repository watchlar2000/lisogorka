export const prepareImages = (formData: FormData) => {
	const images = [];
	for (const [key, value] of formData.entries()) {
		const isImage = key.startsWith('image');

		if (!isImage) continue;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, type, i] = key.split('-');
		const index = Number(i);
		images[index] = { ...images[index], [type]: value };
	}
	return images;
};
