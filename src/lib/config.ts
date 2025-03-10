import type { NavConfig } from './types/common';

export const siteConfig = {
	title: 'Iryna Lisogor Website',
	author: 'Iryna Lisogor',
	url: 'https://www.irynalisogor.art',
	ogImage: 'https://www.irynalisogor.art/og.webp',
	description:
		'Portfolio of Iryna Lisogor, showcasing works in visual development and background painting.',
	links: {
		instagram: 'https://www.instagram.com/iryna_lisogor/',
		linkedin: 'https://www.linkedin.com/in/iryna-lisogor-72975316a/',
		behance: 'https://www.behance.net/lisogorka8741b',
	},
	keywords:
		'illustrator, visual development, background painting, art portfolio, Iryna Lisogor, lisogorka',
	creator: {
		name: 'Sergii Koch',
		github: 'https://github.com/watchlar2000',
		mail: 'sergii.koch@gmail.com',
	},
};

export const navConfig: NavConfig = {
	website: [
		{
			title: 'Home',
			href: '/',
			items: [],
		},
		{
			title: 'Works',
			href: undefined,
			items: [
				{
					title: 'Visual development',
					href: '/visual-development',
					items: [],
				},
				{
					title: 'Background painting',
					href: '/background-painting',
					items: [],
				},
			],
		},
		{
			title: 'Playground',
			href: '/playground',
			items: [],
		},
		{
			title: 'About',
			href: '/about',
			items: [],
		},
	],
	dashboard: [
		{
			title: 'Projects',
			href: '/dashboard/projects',
			items: [],
		},
		{
			title: 'Auth',
			href: '/auth',
			items: [
				{
					title: 'Login',
					href: '/auth/login',
					items: [],
				},
				{
					title: 'Logout',
					href: '/auth/logout',
					items: [],
				},
			],
		},
	],
};

export const ROUTE = {
	home: '/',
	about: '/about',
	visualDevelopment: '/visual-development',
	backgroundPainting: '/background-painting',
	playground: '/playground',
};

export const ROUTE_DASHBOARD = {
	dashboard: '/dashboard',
	login: '/auth/login',
	logout: '/auth/logout',
};
