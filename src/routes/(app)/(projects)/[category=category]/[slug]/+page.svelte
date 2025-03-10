<script>
	import Seo from '$lib/components/SEO.svelte';
	import { sanitizeMarkdown } from '$lib/utils/marked';

	const { data } = $props();
	const description = $derived(
		sanitizeMarkdown(String(data.project.description)),
	);
	const seo = $derived(data.seo);
</script>

<Seo
	title={seo.title}
	description={seo.description}
	ogImage={seo.ogImage}
	ogType={seo.ogType}
/>
<article class="flow prose">
	{@html description}
</article>
