<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import Button from '$lib/components/Ui/Button.svelte';
	import { MODE_CREATE, MODE_EDIT } from '$lib/constants';
	import { createFormState } from '$lib/utils/createFormState.svelte';
	import { getUrlFromImageFile } from '$lib/utils/getUrlFromImageFile';
	import { UploadImageValidationSchema } from '$lib/validationSchema/images';
	import type { ImageModalProps } from './types';

	const {
		id = 0,
		url = '',
		alt = '',
		onSaveCallback,
		loading = false,
	}: ImageModalProps = $props();

	let mode = $derived(id === 0 ? MODE_CREATE : MODE_EDIT);

	$effect(() => {
		resetDefaultDataValues({ id, alt, file: undefined });
	});

	const { formState, register, resetDefaultDataValues, handleSubmit } =
		$derived(
			createFormState({
				defaultDataValues: { id, alt, file: undefined },
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
		if (files) {
			const [uploadedFile] = files as FileList;
			formState.data.file = uploadedFile;
		}
	});

	const onSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const callback = () =>
			onSaveCallback({
				id,
				alt: formState.data.alt,
				file: formState.data.file as File,
			});
		handleSubmit(callback);
	};

	const resetFileInput = () => {
		inputFile.value = '';
		files = undefined;
	};

	export const open = () => {
		modal.open();
	};

	export const close = () => {
		resetFileInput();
		modal.close();
	};
</script>

{#snippet header()}
	<span class="modal__header">
		{mode === MODE_CREATE ? 'Upload' : 'Edit'} image
	</span>
{/snippet}

{#snippet form()}
	<form onsubmit={onSubmit} id="imageForm" class="flow form">
		<div>
			<input type="text" value={id} name="id" id="id" hidden />
		</div>
		{#if currentUrl}
			<div class="image__preview">
				<img src={currentUrl} alt="" />
			</div>
		{/if}
		<div class="flow">
			<div class="repel" class:invalid={formState.errors.file}>
				<label for="file">Select image:</label>
				{#if formState.errors.file}
					<span>
						{formState.errors.file}
					</span>
				{/if}
			</div>
			<input
				type="file"
				accept="image/*"
				bind:this={inputFile}
				bind:files
				{...register('file', { required: !id })}
				data-invalid={formState.errors.file ? true : undefined}
			/>
		</div>
		<div class="flow">
			<div class="repel" class:invalid={formState.errors.alt}>
				<label for="alt">Alternative text:</label>
				{#if formState.errors.alt}
					<span>
						{formState.errors.alt}
					</span>
				{/if}
			</div>
			<input
				type="text"
				placeholder="Describe what is seen in the picture..."
				{...register('alt', { required: true })}
				bind:value={formState.data.alt}
				data-invalid={formState.errors.alt ? true : undefined}
			/>
		</div>
	</form>
{/snippet}

{#snippet controls()}
	<div class="cluster commands">
		<Button variant="primary" type="submit" form="imageForm" {loading}>
			Save
		</Button>
	</div>
{/snippet}

<Modal
	bind:this={modal}
	{header}
	content={form}
	{controls}
	onCloseCallback={resetFileInput}
/>

<style>
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
