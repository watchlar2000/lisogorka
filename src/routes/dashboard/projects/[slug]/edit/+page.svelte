<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import { categories, CATEGORY, SUCCESS } from '$lib/constants';
	import { createFormState } from '$lib/utils/createFormState.svelte.js';
	import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
	import type { SubmitFunction } from '@sveltejs/kit';

	const { form, data } = $props();

	let modal: ImageModal;
	const images = $state([...data.project.images]);

	const openModal = () => {
		modal.open();
	};

	const defaultCategory = CATEGORY.BACKGROUND_PAINTING;
	const projectInitValues = $state({
		title: data.project.title ?? '',
		description: data.project.description ?? '',
		category: data.project.category ?? defaultCategory,
	});

	const { formState, register } = createFormState({
		defaultDataValues: projectInitValues,
		zodSchema: ProjectFormInputSchema,
	});

	const handleEnhance: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === SUCCESS) {
				await invalidateAll();
			}

			await applyAction(result);
		};
	};

	const onSaveCallback = (params) => {
		const id = !params.id ? Math.random() : params.id;
		images.push({ ...params, id });
	};

	let selectedImageId = $state(0);
	const selectedImageModalData = $derived(
		images
			.filter((image) => image.id === selectedImageId)
			?.map((image) => ({
				id: image.id,
				url: image.url,
				alt: image.alt,
				file: undefined,
			}))[0],
	);
</script>

<ImageModal
	bind:this={modal}
	{onSaveCallback}
	id={selectedImageModalData?.id}
	alt={selectedImageModalData?.alt}
	url={selectedImageModalData?.url}
/>
<form
	method="POST"
	use:enhance={handleEnhance}
	class="flow form"
	enctype="multipart/form-data"
>
	<div class="flow">
		<label for="title">Title:</label>
		<input
			type="text"
			id="title"
			name="title"
			{...register('title', { required: true })}
			bind:value={formState.data.title}
		/>
		{#if formState.errors.title || form?.errors.title}<p class="invalid">
				{formState.errors.title ?? form?.errors.title}
			</p>
		{/if}
	</div>
	<div class="flow">
		<label for="description">Description:</label>
		<input
			type="text"
			id="description"
			name="description"
			bind:value={formState.data.description}
			{...register('description')}
		/>
	</div>
	<div class="flow">
		<label for="category">Category:</label>
		<select
			id="category"
			name="category"
			{...register('category', { required: true })}
		>
			{#each categories as category}
				<option
					value={category}
					selected={category === projectInitValues.category}>{category}</option
				>
			{/each}
		</select>
		{#if formState.errors.category || form?.errors.category}<p class="invalid">
				{formState.errors.category ?? form?.errors.category}
			</p>
		{/if}
	</div>
	<div class="flow">
		<p>
			<label for="title">Images:</label>
		</p>
		<button
			class="button button-action"
			type="button"
			onclick={() => {
				selectedImageId = 0;
				openModal();
			}}>+ Add image</button
		>
		{#if images.length}
			<div>
				<ul role="list" class="auto-grid image-list">
					{#each images as image}
						<li class="image-list__item">
							<div class="flow image-card">
								<img src={image?.url} alt="" />
								<div class="cluster image-card__controls">
									<button
										class="button button-control"
										type="button"
										onclick={() => {
											selectedImageId = image.id;
											openModal();
										}}
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
	<div>
		<button type="submit" class="button">Save</button>
	</div>
</form>

<style>
	.form > div {
		--flow-space: var(--space-xs);
	}

	label {
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
