<script>
	import ProjectsList from '$lib/components/ProjectsList.svelte';
	import Seo from '$lib/components/SEO.svelte';

	const { data } = $props();
	const projects = $derived(data.projects);
	const seo = $derived(data.seo);
</script>

<Seo title={seo.title} />
{#if !projects.length}
	<p>No projects...</p>
{:else}
	<ProjectsList {projects} />
{/if}
