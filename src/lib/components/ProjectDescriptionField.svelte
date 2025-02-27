<script lang="ts">
	import Button from '$lib/components/Ui/Button.svelte';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	type ProjectDescriptionFiledProps = {
		source: string;
	};

	let { source = $bindable() }: ProjectDescriptionFiledProps = $props();

	const tabs = [
		{ id: 'tab-1', title: 'Description' },
		{ id: 'tab-2', title: 'Preview' },
	];

	let activeTab = $state(tabs[0].id);
</script>

{#snippet description()}
	<textarea name="description" id="description" bind:value={source}></textarea>
{/snippet}

{#snippet preview(markdown: string)}
	{#if !markdown.trim().length}
		<p>No description provided yet...</p>
	{/if}
	<div class="wrapper article__content">
		<artice class="wrapper flow">
			{@html DOMPurify.sanitize(marked(markdown) as string)}
		</artice>
	</div>
{/snippet}

{#snippet tab(tabId: string)}
	{#if tabId === 'tab-1'}
		{@render description()}
	{:else}
		{@render preview(source)}
	{/if}
{/snippet}

<div class="prose flow">
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
	<div>
		{@render tab(activeTab)}
	</div>
</div>

<style>
	.article__content {
		--wrapper-max-width: 50ch;

		margin-inline: auto;
	}
</style>
