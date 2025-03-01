<script lang="ts">
	import Button from '$lib/components/Ui/Button.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { sanitizeMarkdown } from '$lib/utils/marked.js';
	import { Edit } from 'lucide-svelte';

	const { data } = $props();
	const project = $derived(data.project);
	const description = $derived(
		sanitizeMarkdown(project?.description as string),
	);
</script>

<article class="flow">
	<div class="flow">
		<div class="repel">
			<Button
				as="a"
				href="{project.slug}/edit"
				variant="outline"
				class="cluster"
				size="medium"
			>
				<Edit aria-hidden="true" />
				<span class="">Edit</span>
			</Button>
			<p class="meta">
				<span>Last updated at: {formatDate(project.updatedAt)}</span>
			</p>
		</div>
		<article class="prose">
			<h1>{project.title}</h1>
			{@html description}
		</article>
	</div>
</article>

<style>
	.meta {
		font-size: var(--text-size-meta);
		color: var(--color-surface-text-interact);
	}
</style>
