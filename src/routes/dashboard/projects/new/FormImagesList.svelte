<script lang="ts">
	import { Edit, Trash } from 'lucide-svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	type FormImagesListProps = {
		items: ({ id: number; url: string } & Record<string, unknown>)[];
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
	use:dndzone={{ items, flipDurationMs }}
	onconsider={handleSort}
	onfinalize={handleSort}
>
	{#each items as image (image.id)}
		<li class="image-list__item" animate:flip={{ duration: flipDurationMs }}>
			<div class="flow image-card">
				<img src={image?.url} alt="" />
				<div class="cluster image-card__controls">
					<button
						class="button button-control"
						type="button"
						onclick={() => {
							edit(image.id);
						}}
					>
						<span class="visually-hidden">Edit</span>
						<Edit />
					</button>
					<button
						class="button button-control"
						data-button-type="delete"
						type="button"
						onclick={() => {
							remove(image.id);
						}}
					>
						<span class="visually-hidden">Delete</span>
						<Trash />
					</button>
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

	.button-control {
		font-size: var(--text-size-lede);
		background-color: var(--color-surface-bg);
		color: var(--color-global-text);
	}

	.button-control[data-button-type='delete'] {
		--focus-color: red;

		background-color: red;
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
