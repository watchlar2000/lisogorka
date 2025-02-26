<script lang="ts">
	import { Edit, Trash } from 'lucide-svelte';
	import { dndzone } from 'svelte-dnd-action';
	import Button from './Ui/Button.svelte';

	type FormImagesListProps = {
		items: Record<string, string>[];
		handleSort: (e: CustomEvent) => void;
		edit: (id: number) => void;
		remove: (id: number) => void;
		flipDurationMs?: number;
	};

	const {
		items,
		handleSort,
		edit,
		remove,
		flipDurationMs = 200,
	}: FormImagesListProps = $props();
</script>

<ul
	role="list"
	class="auto-grid image-list"
	use:dndzone={{
		items,
		flipDurationMs,
	}}
	onconsider={handleSort}
	onfinalize={handleSort}
>
	{#each items as image (image.id)}
		<li class="image-list__item">
			<div class="flow image-card">
				<img src={image.url} alt={image.alt} />
				<div class="cluster image-card__controls">
					<Button
						variant="regular"
						type="button"
						onclick={() => {
							edit(image.id);
						}}
						><Edit aria-hidden="true" /><span class="visually-hidden"
							>Edit image {image.title}</span
						></Button
					>

					<Button
						variant="destructive"
						type="button"
						onclick={() => {
							remove(image.id);
						}}
						><Trash aria-hidden="true" /><span class="visually-hidden"
							>Delete image {image.title}</span
						></Button
					>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	.image-card {
		--flow-space: var(--space-xs);
		--gutter: var(--space-s);

		display: inline-block;
		padding: var(--space-2xs);
		border-radius: var(--radius-m);
		background-color: var(--color-global-bg);
	}

	.image-card img {
		height: 15ch;
		width: auto;
		object-fit: cover;
		margin-inline: auto;
		border-radius: calc(var(--radius-m) * 0.5);
	}

	.image-list {
		--auto-grid-gap: var(--space-s);
		--auto-grid-min-size: 18ch;
	}

	.image-list li:first-child {
		border: 3px solid var(--color-primary);
		border-radius: var(--radius-m);
	}

	.image-list .image-card {
		width: 100%;
	}
</style>
