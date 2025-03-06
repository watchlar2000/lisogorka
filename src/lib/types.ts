import type { categories } from './constants';

type NavItem = {
	title: string;
	href: string;
};

type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

export type NavConfig = {
	website: NavItemWithChildren[];
	dashboard: NavItemWithChildren[];
};

export type Category = (typeof categories)[number];
