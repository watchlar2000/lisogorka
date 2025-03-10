<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import FormImagesList from '$lib/components/FormImagesList.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import ImageModal from '$lib/components/Modal/ImageModal/ImageModal.svelte';
	import type { ImageModalSaveParams } from '$lib/components/Modal/ImageModal/types';
	import ProjectDescriptionField from '$lib/components/ProjectDescriptionField.svelte';
	import SelectField from '$lib/components/SelectField.svelte';
	import Button from '$lib/components/Ui/Button.svelte';
	import { categories, FAILURE, SUCCESS } from '$lib/constants';
	import { getToastState } from '$lib/services/toast/toast.svelte';
	import type { Image } from '$lib/types/images';
	import { createFormState } from '$lib/utils/createFormState.svelte';
	import { InternalError } from '$lib/utils/exceptions';
	import { removeImage, submitImage } from '$lib/utils/imageRequests';
	import { ProjectFormInputSchema } from '$lib/validationSchema/projects';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { ImagePlus, Save } from 'lucide-svelte';
	import type { PageProps } from './$types';

	const handleSort = (e: CustomEvent) => {
		items = [...e.detail.items];
	};

	const toastState = getToastState();

	const { data, form }: PageProps = $props();

	const imagesList = [
		...data.project.images.filter(({ id }) => id === data.project.coverImageId),
		...data.project.images.filter(({ id }) => id !== data.project.coverImageId),
	];

	let isFeatured = $state(data.project.isFeatured);
	let loadingImage = $state(false);
	let loadingProject = $state(false);
	let modal: ImageModal;
	let items = $state<Image[]>(imagesList);

	const newImageIdsList = $derived(() => {
		const currentCoverImageId = data.project.coverImageId;
		const currentImageIds = data.project.images.map(({ id }) => id);

		const existingCoverImage = currentCoverImageId === items[0]?.id;
		const newImages = items
			.filter(({ id }) => !currentImageIds.includes(id))
			.map((image) => image.id);

		if (!existingCoverImage) {
			const newCoverImageId = items[0]?.id;
			return new Set([newCoverImageId, ...newImages]);
		} else {
			return [items[0]?.id, ...newImages];
		}
	});

	const projectInitValues = $state({
		id: data.project.id,
		title: data.project.title,
		description: data.project.description ?? '',
		category: data.project.category,
	});

	const { formState, register } = createFormState({
		defaultDataValues: { ...projectInitValues },
		zodSchema: ProjectFormInputSchema,
	});

	const submitProjectForm: SubmitFunction = ({ formData }) => {
		for (const id of newImageIdsList()) {
			formData.append('imageId', String(id));
		}
		loadingProject = true;
		return async ({ result }) => {
			if (result.type === SUCCESS) {
				await invalidateAll();
				const updatedSlug = result?.data?.project.slug;

				if (updatedSlug && updatedSlug !== data.project.slug) {
					const newURL = `/dashboard/projects/${updatedSlug}/edit`;
					goto(newURL, {
						replaceState: true,
					});
				}
				toastState.add({
					message: 'Project was updated successfully',
				});
			} else if (result.type === FAILURE) {
				toastState.add({
					title: 'Error',
					message: 'Something went wrong',
					type: 'warning',
				});
			}
			loadingProject = false;
			await applyAction(result);
		};
	};

	const onSaveImageCallback = async (params: ImageModalSaveParams) => {
		const { id, alt, file } = params;
		const action = !id ? '?/uploadImage' : '?/editImage';
		loadingImage = true;
		const imagePayload = {
			id: Number(id),
			alt,
			file,
		};
		const { image: uploadedImage } = await submitImage({
			payload: imagePayload,
			options: { action },
		});
		if (!uploadedImage) {
			const errorMessage = 'Something went wrong with the uploaded image';
			toastState.add({
				title: 'Error',
				message: errorMessage,
				type: 'warning',
			});
			return InternalError(errorMessage);
		}
		if (!id) {
			items = [...items, uploadedImage];
		} else {
			items = items.map((image) =>
				image.id === uploadedImage.id ? { ...image, ...uploadedImage } : image,
			);
		}
		loadingImage = false;
		modal.close();
		toastState.add({
			message: 'Image uploaded',
		});
	};

	let selectedImageId = $state(0);
	const selectedImageModalData = $derived(
		items.find((image) => image.id === selectedImageId),
	);

	const openModal = () => {
		modal.open();
	};

	const handleEditImage = (id: number) => {
		selectedImageId = id;
		openModal();
	};

	const handleRemoveImage = async (id: number) => {
		await removeImage({
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

	const imageCount = $derived(items.length);
</script>

<ImageModal
	bind:this={modal}
	onSaveCallback={onSaveImageCallback}
	id={selectedImageModalData?.id}
	alt={selectedImageModalData?.alt}
	url={selectedImageModalData?.url}
	loading={loadingImage}
/>

<form
	method="POST"
	action="?/editProject"
	use:enhance={submitProjectForm}
	class="flow form"
	enctype="multipart/form-data"
	id="editProject"
>
	<div class="flow">
		<InputCheckbox {isFeatured} />
	</div>
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
			<span class="label">Images ({imageCount}):</span>
			{#if form?.images}
				<span>
					{form?.images}
				</span>
			{/if}
		</div>
		<Button onclick={handleAddImage} variant="outline">
			<ImagePlus aria-hidden="true" /> Add image
		</Button>
		{#if items.length}
			<div>
				<FormImagesList
					{items}
					{handleSort}
					edit={handleEditImage}
					remove={handleRemoveImage}
				/>
			</div>
		{/if}
		<input type="text" name="id" value={String(data.project.id)} hidden />
	</div>
	<hr />
	<div class="flow">
		<ProjectDescriptionField source={projectInitValues.description} />
	</div>

	<hr />
	<div>
		<Button
			type="submit"
			size="medium"
			variant="primary"
			loading={loadingProject}
		>
			<Save aria-hidden="true" /> Save
		</Button>
	</div>
</form>

<style>
</style>
