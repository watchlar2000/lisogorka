export const getUrlFromImageFile = (file: File) => {
	const isImage = file.type.startsWith('image');

	if (!isImage) return '';

	return URL.createObjectURL(file);
};
