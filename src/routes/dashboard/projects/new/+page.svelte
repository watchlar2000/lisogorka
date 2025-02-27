<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import InputField from '$lib/components/InputField.svelte';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import type { ImageModalSaveParams } from '$lib/components/Modal/ImageModal/types.js';
	import ProjectDescriptionField from '$lib/components/ProjectDescriptionField.svelte';
	import SelectField from '$lib/components/SelectField.svelte';
	import Button from '$lib/components/Ui/Button.svelte';
	import { categories, CATEGORY, SUCCESS } from '$lib/constants';
	import type { Category } from '$lib/types';
	import type { Image } from '$lib/types/images';
	import { createFormState } from '$lib/utils/createFormState.svelte.js';
	import { InternalError } from '$lib/utils/exceptions';
	import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
	import { type SubmitFunction } from '@sveltejs/kit';
	import { ImagePlus, Save } from 'lucide-svelte';
	import FormImagesList from '../../../../lib/components/FormImagesList.svelte';
	import type { PageProps } from './$types';
	import { handleDeleteImage, handleSubmitImage } from './utils';

	const handleSort = (e: CustomEvent) => {
		items = [...e.detail.items];
	};

	const { form }: PageProps = $props();

	let loading = $state(false);
	let modal: ImageModal;
	let items = $state<Image[]>([]);

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

	const submitProjectForm: SubmitFunction = ({ formData }) => {
		for (const image of items) {
			formData.append('imageId', String(image.id));
		}

		return async ({ result }) => {
			if (result.type === SUCCESS) {
				await invalidateAll();
			}

			await applyAction(result);
		};
	};

	const onSaveImageCallback = async (params: ImageModalSaveParams) => {
		const { id, alt, file } = params;
		const action = !id ? '?/uploadImage' : '?/editImage';
		loading = true;
		const imagePayload = {
			id: Number(id),
			alt,
			file,
		};

		const { image: uploadedImage } = await handleSubmitImage({
			payload: imagePayload,
			options: { action },
		});

		if (!uploadedImage) {
			return InternalError('Something went wrong with the uploaded image');
		}

		if (!id) {
			items = [...items, uploadedImage];
		} else {
			items = items.map((image) =>
				image.id === uploadedImage.id ? { ...image, ...uploadedImage } : image,
			);
		}

		loading = false;
		modal.close();
	};

	let selectedImageId = $state(0);
	const selectedImageModalData = $derived(
		items.find((image) => image.id === selectedImageId),
	);

	const openModal = () => {
		modal.open();
	};

	const editImage = (id: number) => {
		selectedImageId = id;
		openModal();
	};

	const removeImage = async (id: number) => {
		await handleDeleteImage({
			payload: { id },
			options: {
				action: '?/removeImage',
			},
		});
		const filteredItems = items.filter((image) => image.id !== id);
		items = [...filteredItems];
	};

	const handleAddImage = () => {
		selectedImageId = 0;
		openModal();
	};
</script>

<ImageModal
	bind:this={modal}
	onSaveCallback={onSaveImageCallback}
	id={selectedImageModalData?.id}
	alt={selectedImageModalData?.alt}
	url={selectedImageModalData?.url}
	{loading}
/>
<form
	method="POST"
	action="?/createProject"
	use:enhance={submitProjectForm}
	class="flow form"
	enctype="multipart/form-data"
	id="createProject"
>
	<div class="flow">
		<InputField
			type="text"
			title="title"
			bind:value={formState.data.title}
			placeholder="Digital serenity..."
			{...register('title', { required: true })}
			error={formState.errors.title}
		/>
	</div>
	<div class="flow">
		<SelectField
			title="category"
			selectedValue={formState.data.category}
			options={[...categories]}
			{...register('category', { required: true })}
		/>
	</div>
	<div class="flow">
		<div class="repel" class:invalid={form?.images}>
			<span class="label">Images:</span>
			{#if form?.images}
				<span>
					{form?.images}
				</span>
			{/if}
		</div>
		<Button onclick={handleAddImage}>
			<ImagePlus aria-hidden="true" /> Add image
		</Button>
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
	<div class="flow">
		<ProjectDescriptionField source={projectInitValues.description} />
	</div>

	<hr />
	<div>
		<Button type="submit" size="medium" variant="primary">
			<Save aria-hidden="true" /> Save
		</Button>
	</div>
</form>
