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
		<span class="label">images:</span>
		<button
			class="button"
			type="button"
			onclick={() => openImageModal({ image: null })}>+ Add image</button
		>
		{#if projectState.images.length}
			<div>
				<ul role="list" class="auto-grid image-list">
					{#each projectState.images as image}
						<li class="image-list__item">
							<img src={image.url} alt="" />
							<div class="cluster controls">
								<button
									type="button"
									class="button"
									onclick={() => openImageModal({ image })}
								>
									Edit
								</button>
								<button type="button" class="button" onclick={() => {}}>
									Delete
								</button>
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

	/* .select__menu--item:focus-visible,
	.select__menu--item:hover,
	.select__menu--item:active {
		background-color: var(--color-mid-shade);
	} */

	/* .button__select {
		--button-bg: var(--color-surface-bg);
		--button-text: currentColor;
	} */
</style>
