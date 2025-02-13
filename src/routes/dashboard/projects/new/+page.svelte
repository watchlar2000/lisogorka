<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import { IMAGE_CATEGORY_LIST } from '$lib/constants';
	import type { Category } from '$lib/server/api/types/types';
	import type {
		FormImageState,
		ProjectImageData,
	} from '$lib/types/new-project';
	import {
		EditImageSchema,
		UploadImageSchema,
	} from '$lib/validationSchema/images';
	import { createSelect } from '@melt-ui/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import type { OnSaveParams, ProjectState } from './types';

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

	const projectState: ProjectState = $state({
		title: '',
		description: '',
		category: $selectedLabel as Category,
		coverImage: null,
		images: [],
	});

	const imageModalForm: FormImageState = $state({
		valid: false,
		errors: {
			file: undefined,
			alt: undefined,
		},
		values: {
			file: null,
			alt: '',
			url: '',
		},
	});

	let selectedImage = $state({
		id: 0,
		isCoverImage: false,
		url: '',
		alt: '',
	});

	const openImageModal = async ({
		image,
		isCoverImage = false,
	}: {
		image: ProjectImageData | null;
		isCoverImage?: boolean;
	}) => {
		selectedImage.id = image?.id ?? 0;
		selectedImage.isCoverImage = isCoverImage;
		selectedImage.url = image?.url ?? '';
		selectedImage.alt = image?.alt ?? '';
		selectedImage = { ...selectedImage };

		imageModalForm.values.file = image?.file ?? null;
		imageModalForm.values.alt = image?.alt ?? '';
		imageModalForm.values.url = image?.url ?? '';

		await tick();
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
		({ id = 0, isCoverImage = false }: OnSaveParams) =>
		({ file, alt }: { alt: string; file: File | null }): boolean => {
			console.log({ isCoverImage });

			const schema = id && file === null ? EditImageSchema : UploadImageSchema;
			const { success, error } = schema.safeParse({ file, alt });

			if (!success) {
				imageModalForm.errors = error.flatten().fieldErrors;
				return false;
			}

			if (isCoverImage) {
				const coverImage = {
					id,
					alt,
					file,
					url: URL.createObjectURL(file as File),
				};
				projectState.coverImage = { ...projectState.coverImage, ...coverImage };
			} else {
				const existingIndex = projectState.images.findIndex(
					(img) => img.id === id,
				);

				if (existingIndex !== -1) {
					let image = projectState.images[existingIndex];
					image.alt = alt;
					image.file = file ?? image.file;
					image.url = file ? URL.createObjectURL(file) : image.url;
				} else {
					projectState.images.push({
						id: Math.random() + 1,
						file,
						alt,
						url: file ? URL.createObjectURL(file) : '',
					});
				}
			}

			imageModalForm.errors.alt = undefined;
			imageModalForm.errors.file = undefined;

			return true;
		};
</script>

{#snippet imagePreview()}
	{#if selectedImage.url}
		<div class="image__preview">
			<img src={selectedImage.url} alt="" />
		</div>
	{/if}
{/snippet}

<ImageModal
	bind:this={modal}
	onSave={onSave({
		id: selectedImage.id,
		isCoverImage: selectedImage.isCoverImage,
	})}
	form={imageModalForm}
	{imagePreview}
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
				class="button button-action"
				type="button"
				onclick={() => openImageModal({ image: null, isCoverImage: true })}
				>+ Add cover image</button
			>
		{:else}
			<div class="flow image-card">
				<img src={projectState?.coverImage.url} alt="" />
				<div class="image-card__controls">
					<button
						class="button button-control"
						type="button"
						onclick={() =>
							openImageModal({
								image: projectState.coverImage,
								isCoverImage: true,
							})}
					>
						Edit
					</button>
				</div>
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
			class="button"
			data-button-type="select"
		>
			{$selectedLabel || 'Select a category'}
		</button>
		{#if $open}
			<div {...$menu} use:menu class="select-menu">
				{#each IMAGE_CATEGORY_LIST as category}
					<div
						{...$option({ value: category, label: category })}
						use:option
						class="select-menu__item"
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
		<span class="label">Images:</span>
		<button
			class="button button-action"
			type="button"
			onclick={() => openImageModal({ image: null })}>+ Add image</button
		>
		{#if projectState.images.length}
			<div>
				<ul role="list" class="auto-grid image-list">
					{#each projectState.images as image}
						<li class="image-list__item">
							<div class="flow image-card">
								<img src={image.url} alt="" />
								<div class="cluster image-card__controls">
									<button
										class="button button-control"
										type="button"
										onclick={() => openImageModal({ image })}
									>
										Edit
									</button>
									<button
										class="button button-control"
										data-button-type="delete"
										type="button"
										onclick={() => {}}
									>
										Delete
									</button>
								</div>
							</div>
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

	.select-menu {
		background-color: #fefefe;
		padding: var(--space-2xs);
		font-weight: var(--font-regular);
		border-radius: var(--radius-m);
		box-shadow: 0px 0px 20px 16px rgba(17, 17, 26, 0.05);
	}

	.select-menu__item {
		cursor: pointer;
		padding: var(--space-xs) var(--space-s);
		border-radius: calc(var(--radius-m) / 1.5);
	}

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

	.button-action {
		font-size: var(--text-size-meta);
		font-weight: var(--font-medium);
		background-color: var(--color-surface-text-interact);
	}

	[data-button-type='select'] {
		--focus-color: var(--color-global-text);

		color: var(--color-global-text);
		background-color: var(--color-global-bg);
		border: var(--stroke-solid);
	}

	.image-list {
		--auto-grid-gap: var(--space-s);
		--auto-grid-min-size: 18ch;
	}

	.image-list .image-card {
		width: 100%;
	}
</style>
