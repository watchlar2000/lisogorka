<script>
	import Seo from '$lib/components/SEO.svelte';
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<Seo />
<main>
	{@render children()}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
	}
</style>
