<script lang="ts">
	import Button from '$lib/components/Ui/Button.svelte';
	import { sanitizeMarkdown } from '$lib/utils/marked';

	type ProjectDescriptionFieldProps = {
		source: string;
	};

	let { source = $bindable() }: ProjectDescriptionFieldProps = $props();

	const tabs = [
		{ id: 'description', title: 'Description' },
		{ id: 'preview', title: 'Preview' },
	];

	let activeTab = $state(tabs[1].id);
</script>

{#snippet description()}
	<textarea name="description" id="description" bind:value={source}></textarea>
{/snippet}

{#snippet preview(markdown: string)}
	{#if !markdown.trim().length}
		<p>No description provided yet...</p>
	{/if}
	<article class="flow article-content">
		{@html sanitizeMarkdown(markdown)}
	</article>
{/snippet}

{#snippet tab(currentTabId: string)}
	{#if currentTabId === 'description'}
		{@render description()}
	{:else}
		{@render preview(source)}
	{/if}
{/snippet}

<div class="flow">
	<ul role="list" class="list cluster">
		{#each tabs as tab (tab.id)}
			<li>
				<Button
					variant={activeTab === tab.id ? 'regular' : 'secondary'}
					size="small"
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
