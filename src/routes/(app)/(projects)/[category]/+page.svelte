<script>
	import ProjectsList from '$lib/components/ProjectsList.svelte';

	const { data } = $props();
	const projects = $derived(data.projects);
</script>

{#if !projects.length}
	<p>No projects...</p>
{:else}
	<ProjectsList {projects} />
{/if}
