<script>
	import { formatDate } from '$lib/utils/formatDate';
	import { markedWithSanitization } from '$lib/utils/marked';
	import DOMPurify from 'dompurify';

	const { data } = $props();
	const project = $derived(data.project);

	const description = $derived(() => {
		if (!project.description) return '';
		return String(markedWithSanitization(project.description));
	});
</script>

<article class="flow">
	<div class="flow prose article__content">
		<div class="repel">
			<button type="button" class="button">Edit</button>
			<p><span>Last updated at:</span> {formatDate(project.updatedAt)}</p>
		</div>
		<h2>{project.title}</h2>
		{@html DOMPurify.sanitize(description())}
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
