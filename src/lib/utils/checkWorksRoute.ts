import { navConfig } from '$lib/config';

export const validateWorksRoute = (categoryParam: string) => {
	const acceptedCategoryList =
		navConfig.website[0].items?.map((item) => item.href.split('/').pop()) ?? [];

	return acceptedCategoryList.includes(categoryParam);
};
