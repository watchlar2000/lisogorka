<script lang="ts">
	import type { Image } from '$lib/types/images';
	import { formatDate } from '$lib/utils/formatDate';
	import { Check, Clipboard, Edit, Trash } from 'lucide-svelte';
	import { dndzone } from 'svelte-dnd-action';
	import Button from './Ui/Button.svelte';

	type FormImagesListProps = {
		items: Image[];
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

	const copyImageToClipboard = ({
		url,
		alt,
		width,
		height,
	}: Omit<Image, 'id'>) => {
		const imgTag = `<img src="${url}" alt="${alt}" width="${width}" height="${height}" loading="lazy">`;
		navigator.clipboard.writeText(imgTag);
	};

	const extractImageMeta = (image: Image) => ({
		url: image.url,
		alt: image.alt,
		width: image.width,
		height: image.height,
	});
</script>

<ul
	role="list"
	class="auto-grid cards-list"
	use:dndzone={{
		items,
		flipDurationMs,
	}}
	onconsider={handleSort}
	onfinalize={handleSort}
>
	{#each items as image, index (image.id)}
		<li>
			<div class="card">
				<div class="card-header">
					{#if !index}<span class="cluster cover-checkmark">
							<Check size={32} />
						</span>{/if}
					<img src={image.url} alt={image.alt} class="card-image" />
					<div class="card-actions">
						<Button
							type="button"
							variant="outline"
							size="small"
							onclick={() => copyImageToClipboard(extractImageMeta(image))}
							class="copy-button"
						>
							<Clipboard aria-hidden />
							<span class="visually-hidden">Copy image tag to clipboard</span>
						</Button>
					</div>
				</div>
				<div class="flow card-meta">
					<p class="card-title">{image.alt}</p>
					<div>
						<ul role="list">
							<li>
								Created: {formatDate(image?.createdAt as Date)}
							</li>
							<li>
								Last updated: {formatDate(image?.updatedAt as Date)}
							</li>
						</ul>
					</div>
					<div class="card-controls cluster">
						<Button
							variant="secondary"
							type="button"
							size="small"
							onclick={() => {
								edit(image.id);
							}}
						>
							<Edit aria-hidden="true" />
							<span class="visually-hidden">Edit</span>
						</Button>
						<Button
							variant="destructive"
							type="button"
							size="small"
							onclick={() => {
								remove(image.id);
							}}
						>
							<Trash aria-hidden="true" />
							<span class="visually-hidden">Delete image</span>
						</Button>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	.cards-list {
		--auto-grid-gap: var(--space-m);
		--auto-grid-min-size: 20rem;
	}
	.card {
		/* --flow-space: var(--space-2xs); */

		/* padding: var(--space-s); */
		border-radius: var(--radius-m);
		background-color: var(--color-global-bg);
		overflow: hidden;
	}
	.card-header {
		position: relative;
	}

	.cover-checkmark {
		position: absolute;
		top: var(--space-2xs);
		left: var(--space-2xs);

		background-color: orange;
		padding: var(--space-3xs);
		border-radius: 50%;
	}

	.card-actions {
		position: absolute;
		top: var(--space-2xs);
		right: var(--space-2xs);
	}

	.card-title {
		font-size: var(--text-size-base);
		color: var(--color-global-text);
	}

	.card-meta {
		font-size: var(--text-size-meta);
		padding: var(--space-s);
		color: var(--color-surface-text-interact);
	}

	.card-image {
		aspect-ratio: 16/9;
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.card-controls {
		--gutter: var(--space-s);
	}
</style>
