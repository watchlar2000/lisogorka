import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const formatCamelCase = (str: string) => {
	const formattedStr = str
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toLowerCase();
	return capitalizeFirstLetter(formattedStr);
};
