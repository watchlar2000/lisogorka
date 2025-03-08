<script>
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config';

	const currentUrl = $derived(siteConfig.url + page.url.pathname);
	const {
		title = siteConfig.title,
		description = siteConfig.description,
		keywords = siteConfig.keywords,
		author = siteConfig.author,
		ogImage = siteConfig.ogImage,
		ogType = 'website',
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<link rel="canonical" href={currentUrl} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content={ogType} />

	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": title,
			"url": currentUrl,
			"author": {
				"@type": "Person",
				"name": author
			},
			"image": ogImage,
			"description": description
		})}
	</script>
</svelte:head>
