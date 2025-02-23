<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import Button from '$lib/components/Ui/Button.svelte';
	import { createFormState } from '$lib/utils/createFormState.svelte';
	import { getUrlFromImageFile } from '$lib/utils/getUrlFromImageFile';
	import { UploadImageValidationSchema } from '$lib/validationSchema/images';
	import type { ImageModalProps } from './types';

	const {
		id = 0,
		url = '',
		file = undefined,
		alt = '',
		onSaveCallback,
	}: ImageModalProps = $props();

	$effect(() => {
		resetDefaultDataValues({ id, file, alt });
	});

	const {
		formState,
		register,
		resetDefaultDataValues,
		handleSubmit,
		resetFormState,
	} = $derived(
		createFormState({
			defaultDataValues: { id, file, alt },
			zodSchema: UploadImageValidationSchema(!!id),
		}),
	);

	let modal: Modal;
	let inputFile: HTMLInputElement;
	let files = $state<FileList>();
	let currentUrl = $derived(
		formState.data.file ? getUrlFromImageFile(formState.data.file) : url,
	);

	$effect(() => {
		if (inputFile && files) {
			const [uploadedFile] = files as FileList;
			formState.data.file = uploadedFile;
		}
	});

	export const open = () => {
		modal.open();
	};

	const close = () => {
		resetFileInput();
		resetFormState();
		modal.close();
	};

	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		const callback = () => {
			onSaveCallback({
				id,
				alt: formState.data.alt,
				file: formState.data.file,
				url: formState.data.file
					? getUrlFromImageFile(formState.data.file)
					: currentUrl,
			});
			close();
		};

		handleSubmit(callback);
	};

	const resetFileInput = () => {
		inputFile.value = '';
	};
</script>

{#snippet header()}
	<span class="modal__header">Upload/Edit image</span>
{/snippet}

{#snippet content()}
	<form onsubmit={onSubmit} id="imageForm" class="flow form">
		{#if currentUrl}
			<div class="image__preview">
				<img src={currentUrl} alt="" />
			</div>
		{/if}
		<div class="flow">
			<label for="file">Select image:</label>
			<input
				type="file"
				accept="image/*"
				bind:files
				bind:this={inputFile}
				{...register('file')}
			/>
			{#if formState.errors.file}<p class="invalid">
					{formState.errors.file}
				</p>
			{/if}
		</div>
		<div class="flow">
			<label for="alt"> Alternative text:</label>
			<input
				type="text"
				placeholder="Describe what is seen in the picture..."
				{...register('alt', { required: true })}
				bind:value={formState.data.alt}
			/>
			{#if formState.errors.alt}<p class="invalid">
					{formState.errors.alt}
				</p>
			{/if}
		</div>
	</form>
{/snippet}

{#snippet controls()}
	<div class="cluster commands">
		<!-- <button type="submit" class="button" form="imageForm">Save</button> -->
		<Button variant="primary" type="submit" form="imageForm">Save</Button>
	</div>
{/snippet}

<Modal
	bind:this={modal}
	{header}
	{content}
	{controls}
	onCloseCallback={resetFileInput}
/>

<style>
	.form > div {
		--flow-space: var(--space-xs);
	}

	label {
		font-weight: var(--font-medium);
		font-size: var(--text-size-meta);
	}
	.modal__header {
		font-size: var(--text-size-heading-4);
		font-weight: var(--font-medium);
	}

	input {
		--focus-color: var(--color-primary);
	}

	.commands {
		--cluster-horizontal-alignment: flex-end;
	}

	.label {
		display: block;
		font-weight: var(--font-medium);
		font-size: var(--text-size-meta);
	}

	.image__preview {
		height: 15ch;
	}

	.image__preview img {
		height: 100%;
		width: auto;
		margin-inline: auto;
	}
</style>
