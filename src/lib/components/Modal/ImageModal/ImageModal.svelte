<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { createFormState } from '$lib/utils/createFormState.svelte';
	import { getUrlFromImageFile } from '$lib/utils/getUrlFromImageFile';
	import { UploadImageSchema } from '$lib/validationSchema/images';

	type ImageModalProps = {
		id?: number;
		url?: string;
		alt?: string;
		file?: File;
		onSaveCallback: (params: {
			id: number;
			url: string;
			alt: string;
			file?: File;
		}) => void;
	};

	const {
		id = 0,
		url = '',
		file = undefined,
		alt = '',
		onSaveCallback,
	}: ImageModalProps = $props();

	$effect(() => {
		resetDefaultDataValues({ file, alt });
	});

	const { formState, register, resetFormState, resetDefaultDataValues } =
		createFormState({
			defaultDataValues: { file, alt },
			zodSchema: UploadImageSchema,
		});

	let modal: Modal;
	let inputFile: HTMLInputElement;
	let files = $state();
	let currentUrl = $derived(
		url.length ? url : getUrlFromImageFile(formState.data.file ?? new Blob()),
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
		resetForm();
		modal.close();
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		if (!formState.valid) return;

		onSaveCallback({
			id,
			...formState.data,
			url: currentUrl,
		});

		close();
	};

	const resetForm = () => {
		resetFormState();
		inputFile.value = '';
	};
</script>

{#snippet header()}
	<span class="modal__header">Upload/Edit image</span>
{/snippet}

{#snippet content()}
	<form onsubmit={handleSubmit} id="imageForm" class="flow form">
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
				id="file"
				name="file"
				{...register('file', { required: true })}
				bind:this={inputFile}
				bind:files
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
				id="alt"
				name="alt"
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
		<button type="submit" class="button" form="imageForm">Save</button>
	</div>
{/snippet}

<Modal
	bind:this={modal}
	{header}
	{content}
	{controls}
	onCloseCallback={resetForm}
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
