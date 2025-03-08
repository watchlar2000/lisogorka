import { ROUTE, siteConfig } from '$lib/config';
import { routing } from '$lib/server/api/routing';

export const prerender = false;

export async function GET() {
	const pages = Object.values(ROUTE);
	const url = siteConfig.url;

	const allFeaturedProjects = await routing.projects.listAll({
		isFeatured: true,
	});
	const projectUrls = allFeaturedProjects.map(
		(project) => `/${project.category}/${project.slug}`,
	);
	const allPages = [...pages, ...projectUrls];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    >
      ${allPages
				.map(
					(route) => `
          <url>
            <loc>${url}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>'monthly'</changefreq>
            <priority>${route === '/' ? '1.0' : '0.8'}</priority>
          </url>`,
				)
				.join('')}
    </urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600',
		},
	});
}
