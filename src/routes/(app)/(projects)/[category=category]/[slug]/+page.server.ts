import { siteConfig } from '$lib/config';
import { routing } from '$lib/server/api/routing';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const project = await routing.projects.findBySlug(slug);
	const images = await routing.projectsToImagesService.getRelatedImages(
		project.id,
	);
	const seo = {
		title: `${project.title} | ${siteConfig.author}`,
		description: project.description,
		ogImage: project.coverImage?.url,
		ogType: 'article',
	};

	return {
		project: { ...project, images },
		seo,
	};
};
