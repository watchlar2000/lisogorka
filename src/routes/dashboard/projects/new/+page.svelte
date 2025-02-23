<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import type {
		ImageModalData,
		ImageModalSaveParams,
	} from '$lib/components/Modal/ImageModal/types.js';
	import Button from '$lib/components/Ui/Button.svelte';
	import { categories, CATEGORY, SUCCESS } from '$lib/constants';
	import type { Category } from '$lib/types';
	import { createFormState } from '$lib/utils/createFormState.svelte.js';
	import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormImagesList from './FormImagesList.svelte';
	import FormInput from './InputField.svelte';
	import FormSelect from './SelectField.svelte';

	const handleSort = (e: CustomEvent) => {
		items = [...e.detail.items];
	};

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
		category: defaultCategory as Category,
	});

	const { formState, register } = createFormState({
		defaultDataValues: { ...projectInitValues },
		zodSchema: ProjectFormInputSchema,
	});

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

	const editImage = (id: number) => {
		selectedImageId = id;
		openModal();
	};

	const removeImage = (id: number) => {
		console.log('removing image ', id);
	};

	const handleAddImage = () => {
		selectedImageId = 0;
		openModal();
	};
</script>

{#snippet error(field: keyof typeof formState.errors)}
	{#if formState.errors?.[field] || form?.errors?.[field]}
		<p class="invalid">
			{formState.errors?.[field] || form?.errors?.[field]}
		</p>
	{/if}
{/snippet}

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
		<FormInput
			type="text"
			title="title"
			bind:value={formState.data.title}
			placeholder="Digital serenity..."
			{error}
			{...register('title', { required: true })}
		/>
	</div>
	<div class="flow">
		<FormInput
			type="text"
			title="description"
			bind:value={formState.data.description!}
			placeholder="Lorem ipsum dolor sit amet..."
			{error}
			{...register('description')}
		/>
	</div>
	<div class="flow">
		<FormSelect
			title="category"
			selectedValue={formState.data.category}
			options={[...categories]}
			{error}
			{...register('category', { required: true })}
		/>
	</div>
	<div class="flow">
		<p><span class="label">Images:</span></p>
		{#if form?.errors?.images}
			<p class="invalid">
				{form?.errors?.images}
			</p>
		{/if}
		<Button onclick={handleAddImage}>+ Add image</Button>
		{#if items.length}
			<div>
				<FormImagesList
					{items}
					{handleSort}
					edit={editImage}
					remove={removeImage}
				/>
			</div>
		{/if}
	</div>

	<hr />
	<div>
		<Button type="submit" size="medium" variant="primary">Save</Button>
	</div>
</form>

<style>
	.form div {
		--flow-space: var(--space-xs);
	}
</style>
