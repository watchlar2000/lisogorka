<script lang="ts">
	import Button from '$lib/components/Ui/Button.svelte';
	import { sanitizeMarkdown } from '$lib/utils/marked';

	type ProjectDescriptionFieldProps = {
		source: string;
	};

	let { source = $bindable() }: ProjectDescriptionFieldProps = $props();

	const previewSource = $derived(sanitizeMarkdown(source));

	const tabs = [
		{ id: 'description', title: 'Description' },
		{ id: 'preview', title: 'Preview' },
	];

	let activeTab = $state(tabs[0].id);
</script>

{#snippet description(hidden = false)}
	<textarea
		name="description"
		id="description"
		bind:value={source}
		{hidden}
	></textarea>
{/snippet}

{#snippet preview(html: string)}
	{#if !html.trim().length}
		<p>No description provided yet...</p>
	{/if}
	{@render description(true)}
	<article class="flow prose">
		{@html html}
	</article>
{/snippet}

{#snippet tab(currentTabId: string)}
	{#if currentTabId === 'description'}
		{@render description()}
	{:else}
		{@render preview(previewSource)}
	{/if}
{/snippet}

<div class="flow">
	<ul role="list" class="list cluster">
		{#each tabs as tab (tab.id)}
			<li>
				<Button
					variant={activeTab === tab.id ? 'outline' : 'secondary'}
					onclick={() => {
						activeTab = tab.id;
					}}
				>
					{tab.title}
				</Button>
			</li>
		{/each}
	</ul>
	{@render tab(activeTab)}
</div>
