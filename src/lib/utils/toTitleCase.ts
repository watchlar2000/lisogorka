export const toTitleCase = (text: string) => {
	return text.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};
