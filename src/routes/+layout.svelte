<script>
	import { siteConfig } from '$lib/config';
	import '$lib/styles/index.css';

	let { children } = $props();

	const { title, description, keywords, author, url } = siteConfig;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/og.webp" />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
	}
</style>
