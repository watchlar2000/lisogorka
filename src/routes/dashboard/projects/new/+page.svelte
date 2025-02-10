<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import { IMAGE_CATEGORY_LIST } from '$lib/constants';
	import type { Category } from '$lib/server/api/types/types';
	import { createSelect } from '@melt-ui/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let modal: ImageModal;

	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<Category>({
		positioning: {
			placement: 'bottom-start',
		},
	});

	type Image = {
		id: string;
		url: string;
		alt: string;
		file: File | null;
	};

	type ProjectState = {
		title: string;
		description: string;
		category: Category;
		coverImage: Image | null;
		images: Image[];
	};

	const projectState: ProjectState = $state({
		title: '',
		description: '',
		category: $selectedLabel as Category,
		coverImage: null,
		images: [],
	});

	let selectedImage: Image & { isCoverImage: boolean } = $state({
		id: '',
		file: null,
		alt: '',
		url: '',
		isCoverImage: false,
	});

	const openImageModal = ({
		image,
		isCoverImage = false,
	}: {
		image: Image | null;
		isCoverImage: boolean;
	}) => {
		selectedImage.id = image?.id ?? '';
		selectedImage.url = image?.url ?? '';
		selectedImage.alt = image?.alt ?? '';
		selectedImage.file = image?.file ?? null;
		selectedImage.isCoverImage = isCoverImage;

		selectedImage = { ...selectedImage };
		modal.open();
	};

	const handleEnhance: SubmitFunction = ({ formData }) => {
		formData.set('category', $selectedLabel);
		if (projectState.coverImage && projectState.coverImage.file) {
			formData.set('coverImageAlt', projectState.coverImage.alt);
			formData.set('coverImageFile', projectState.coverImage.file);
		}

		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
			}

			await applyAction(result);
		};
	};

	const onSave =
		(isCoverImage = false) =>
		({ id, file, alt, url }: Image) => {
			console.log(isCoverImage);

			const existingIndex = projectState.images.findIndex(
				(img) => img.id === id,
			);

			if (existingIndex !== -1) {
				projectState.images[existingIndex] = {
					id,
					file,
					alt,
					url,
				};
			} else {
				projectState.images.push({ id, file, alt, url });
			}
		};
</script>

<ImageModal
	bind:this={modal}
	onSave={onSave(selectedImage.isCoverImage)}
	id={selectedImage.id}
	file={selectedImage.file}
	alt={selectedImage.alt}
	url={selectedImage.url}
/>
<form
	method="POST"
	use:enhance={handleEnhance}
	class="flow"
	enctype="multipart/form-data"
>
	<label for="title" class="">
		<span class="label">Title:</span>
		<input type="text" id="title" name="title" value="" />
	</label>
	<div class="flow form__item">
		<span class="label">Cover image:</span>

		{#if !projectState.coverImage}
			<button
				class="button"
				type="button"
				onclick={() => openImageModal({ image: null, isCoverImage: true })}
				>+ Add cover image</button
			>
		{:else}
			<div class="image">
				<button
					class="button"
					type="button"
					onclick={() => openImageModal({ image: null, isCoverImage: true })}
				>
					Edit
				</button>
				<img src={projectState?.coverImage.url} alt="" />
			</div>
		{/if}
	</div>
	<label for="description" class="">
		<span class="label">Description:</span>
		<input type="text" id="description" name="description" value="" />
	</label>
	<div class="flow select form__item">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label {...$label} use:label class="label">Category:</label>
		<button
			{...$trigger}
			use:trigger
			aria-label="Category"
			class="button button__select"
		>
			{$selectedLabel || 'Select a category'}
		</button>
		{#if $open}
			<div {...$menu} use:menu class="select__menu">
				{#each IMAGE_CATEGORY_LIST as category}
					<div
						{...$option({ value: category, label: category })}
						use:option
						class="select__menu--item"
					>
						<div
							class="check {$isSelected(category) ? 'block' : 'hidden'}"
						></div>
						{category}
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="flow">
		<span class="label">images:</span>
		<button
			class="button"
			type="button"
			onclick={() => openImageModal({ image: null })}>+ Add image</button
		>
		{#if projectState.images.length}
			<div>
				<ul role="list" class="flow image__list">
					{#each projectState.images as image}
						<li>
							<button
								type="button"
								class="button"
								onclick={() => openImageModal({ image })}
							>
								edit image
							</button>
							<img src={image.url} alt="" />
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<hr />
	<div class="cluster">
		<button type="submit" class="button">Save</button>
	</div>
</form>

<style>
	.form__item {
		--gutter: var(--space-xl);
		--flow-space: var(--spase-xl);
	}

	.label {
		display: block;
		font-weight: var(--font-medium);
		font-size: var(--text-size-meta);
	}

	.select__menu {
		background-color: #fefefe;
		padding: var(--space-2xs);
		font-weight: var(--font-regular);
		border-radius: var(--radius-m);
		box-shadow: 0px 0px 20px 16px rgba(17, 17, 26, 0.05);
	}

	.select__menu--item {
		cursor: pointer;
		padding: var(--space-xs) var(--space-s);
		border-radius: calc(var(--radius-m) / 1.5);
	}

	.select__menu--item:focus-visible,
	.select__menu--item:hover,
	.select__menu--item:active {
		background-color: var(--color-mid-shade);
	}

	.button__select {
		--button-bg: var(--color-surface-bg);
		--button-text: currentColor;
	}

	.image {
		position: relative;
		/* height: 15ch; */
		width: 15ch;
		/* object-fit: cover; */
		aspect-ratio: 1.5;
		/* overflow: hidden; */
	}

	.image button {
		position: absolute;
		top: 0;
		right: 0;
	}

	.button__add-image {
		--button-bg: var(--color-surface-bg);
		--button-text: var(--color-global-text);

		justify-content: center;
		border: dashed 3px var(--color-surface-text-interact);
		width: 15ch;
		aspect-ratio: 1.5;
	}

	.image__list li img {
		height: 10ch;
		width: auto;
	}
</style>
