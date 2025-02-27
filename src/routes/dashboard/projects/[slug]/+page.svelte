<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { sanitizeMarkdown } from '$lib/utils/marked.js';

	const { data } = $props();
	const project = $derived(data.project);
	const description = $derived(
		sanitizeMarkdown(project?.description as string),
	);
</script>

<article class="flow">
	<div class="flow">
		<div class="repel">
			<button type="button" class="button">Edit</button>
			<p>
				<span>Last updated at:</span>
				{formatDate(project.updatedAt)}
			</p>
		</div>
		<article class="prose">
			<h1>{project.title}</h1>
			{@html description}
		</article>
	</div>
</article>
