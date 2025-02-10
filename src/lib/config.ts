import type { NavConfig } from './types';

export const siteConfig = {
	name: 'Iryna Lisogor Portfolio Page',
	url: 'https://www.irynalisogor.art/',
	ogImage: 'https://www.irynalisogor.art/og.jpg',
	description:
		'Portfolio of Iryna Lisogor, showcasing works in visual development and background painting.',
	links: {
		/// add social links
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
			title: 'Works',
			href: '/works',
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
			],
		},
	],
};
