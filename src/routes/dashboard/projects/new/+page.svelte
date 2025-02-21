<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import type {
		ImageModalData,
		ImageModalSaveParams,
	} from '$lib/components/Modal/ImageModal/types.js';
	import { categories, CATEGORY, SUCCESS } from '$lib/constants';
	import { createFormState } from '$lib/utils/createFormState.svelte.js';
	import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	const flipDurationMs = 200;
	function handleSort(e: CustomEvent) {
		items = [...e.detail.items];
	}

	const { form } = $props();

	let modal: ImageModal;
	let items = $state<ImageModalData[]>([]);

	const openModal = () => {
		modal.open();
	};

	const defaultCategory = CATEGORY.BACKGROUND_PAINTING;
	const projectInitValues = $state({
		id: 0,
		title: '',
		description: '',
		category: defaultCategory,
	});

	const { formState, register } = createFormState({
		defaultDataValues: { ...projectInitValues },
		zodSchema: ProjectFormInputSchema,
	});

	$inspect(form?.errors);

	const handleEnhance: SubmitFunction = ({ formData }) => {
		for (const image of items) {
			formData.append('file', image.file as File);
			formData.append('alt', image.alt);
		}

		return async ({ result }) => {
			if (result.type === SUCCESS) {
				await invalidateAll();
			}

			await applyAction(result);
		};
	};

	const onSaveCallback = (params: ImageModalSaveParams) => {
		if (params.id !== 0) {
			const updatedImages = items.map((i) => {
				if (i.id === params.id) {
					return { ...i, ...params };
				}
				return i;
			});
			items = [...updatedImages];
		} else {
			items.push({ ...params, id: Math.random() });
		}
	};

	let selectedImageId = $state(0);
	const selectedImageModalData = $derived(
		items
			.filter((image) => image.id === selectedImageId)
			?.map(({ id, url, alt }) => ({
				id,
				url,
				alt,
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
			bind:value={formState.data.title}
			{...register('title', { required: true })}
		/>
		{#if formState.errors.title || form?.errors?.title}<p class="invalid">
				{formState.errors.title || form?.errors?.title}
			</p>
		{/if}
	</div>
	<div class="flow">
		<label for="description">Description:</label>
		<input
			type="text"
			bind:value={formState.data.description}
			{...register('description')}
		/>
	</div>
	<div class="flow">
		<label for="category">Category:</label>
		<select {...register('category', { required: true })}>
			{#each categories as category}
				{#if category === defaultCategory}
					<option value={defaultCategory} selected>{defaultCategory}</option>
				{:else}
					<option value={category}>{category}</option>
				{/if}
			{/each}
		</select>
		{#if formState.errors.category}<p class="invalid">
				{formState.errors.category}
			</p>
		{/if}
	</div>
	<div class="flow">
		<p>
			<label for="title">Images:</label>
		</p>
		{#if form?.errors?.images}<p class="invalid">
				{form?.errors?.images}
			</p>
		{/if}
		<button
			class="button button-action"
			type="button"
			onclick={() => {
				selectedImageId = 0;
				openModal();
			}}>+ Add image</button
		>
		{#if items.length}
			<div>
				<ul
					role="list"
					class="auto-grid image-list"
					use:dndzone={{ items, flipDurationMs }}
					onconsider={handleSort}
					onfinalize={handleSort}
				>
					{#each items as image (image.id)}
						<li
							class="image-list__item"
							animate:flip={{ duration: flipDurationMs }}
						>
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

<!-- <section
	use:dndzone={{ items, flipDurationMs }}
	onconsider={handleSort}
	onfinalize={handleSort}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			{item.title}
		</div>
	{/each}
</section> -->

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
