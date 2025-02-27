<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { marked } from 'marked';

	const { data } = $props();
	const project = $derived(data.project);
	const projectDescription = $derived(marked(project?.description as string));
</script>

<article class="flow">
	<div class="flow prose article__content">
		<div class="repel">
			<button type="button" class="button">Edit</button>
			<p><span>Last updated at:</span> {formatDate(project.updatedAt)}</p>
		</div>
		<h2>{project.title}</h2>
		{@html projectDescription}
	</div>
</article>

<style>
	.article__content {
		--wrapper-max-width: 50ch;
	}

	.prose {
		display: grid;
		place-content: center;
	}
</style>
