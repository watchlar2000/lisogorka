<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { FormInputValues, ImageModalProps } from './types';

	let modal: Modal;
	let inputFile: HTMLInputElement;

	export const open = () => {
		modal.open();
	};

	const { onSave, form }: ImageModalProps = $props();

	const formInputValues: FormInputValues = $state({
		file: null,
		alt: '',
		url: '',
	});

	$effect(() => {
		formInputValues.file = form.values.file;
		formInputValues.alt = form.values.alt;
		formInputValues.url = form.values.url;
	});

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const fd = new FormData(e?.currentTarget as HTMLFormElement);
		const fileFromInput = fd.get('file') as File;
		const file = fileFromInput.size ? fileFromInput : form.values.file;
		const alt = String(fd.get('alt'));
		const isValid = onSave({
			alt: alt,
			file: file,
		});
		if (!isValid) return;
		modal.close();
		formInputValues.url = '';
	};

	const getUrlFromImageFile = (file: File) => {
		const isImage = file.type.startsWith('image');

		if (!isImage) return '';

		return URL.createObjectURL(file);
	};

	const handleInputFileChange = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
	): string | void => {
		if (e.currentTarget.files) {
			const file = e.currentTarget.files[0];
			formInputValues.url = getUrlFromImageFile(file);
		}
	};

	export const resetForm = () => {
		if (inputFile) inputFile.value = '';
	};
</script>

{#snippet header()}
	<span class="modal__header">Upload/Edit image</span>
{/snippet}

{#snippet content()}
	<form onsubmit={handleSubmit} id="imageForm" class="prose">
		{#if formInputValues.url}
			<div class="image__preview">
				<img src={formInputValues.url} alt="" />
			</div>
		{/if}
		<label for="file" class="">
			<span class="label">Select image:</span>
			<input
				aria-invalid={form.errors.file ? true : undefined}
				type="file"
				accept="image/*"
				id="file"
				name="file"
				bind:this={inputFile}
				onchange={handleInputFileChange}
			/>
		</label>
		{#if form.errors.file}
			<span class="invalid">{form.errors.file}</span>
		{/if}
		<label for="alt">
			<span class="label">Alternative text:</span>
			<input
				aria-invalid={form.errors.alt ? true : undefined}
				type="text"
				id="alt"
				name="alt"
				placeholder="Describe what is seen in the picture..."
				bind:value={formInputValues.alt}
			/>
		</label>
		{#if form.errors.alt}
			<span class="invalid">{form.errors.alt}</span>
		{/if}
	</form>
{/snippet}

{#snippet controls()}
	<div class="cluster commands">
		<button type="submit" class="button" form="imageForm">Save</button>
	</div>
{/snippet}

<Modal
	bind:this={modal}
	onCloseCallback={resetForm}
	{header}
	{content}
	{controls}
/>

<style>
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
