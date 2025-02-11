<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { FormInputValues, ImageModalProps } from './types';

	let modal: Modal;
	let inputFile: HTMLInputElement;

	export const open = () => {
		modal.open();
	};

	const { onSave, form, imagePreview }: ImageModalProps = $props();

	const formInputValues: FormInputValues = $state({
		file: null,
		alt: '',
		url: '',
	});

	$effect(() => {
		formInputValues.file = form.values.file;
		formInputValues.alt = form.values.alt;
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
	};

	export const resetForm = () => {
		if (inputFile) inputFile.value = '';
	};
</script>

<Modal bind:this={modal} onCloseCallback={resetForm}>
	<div slot="header" class="modal__header">
		<span>Add new image </span>
	</div>
	<form onsubmit={handleSubmit} id="imageForm" class="prose">
		{@render imagePreview()}
		<label for="file" class="">
			<span class="label">Select image:</span>
			<input
				aria-invalid={form.errors.file ? true : undefined}
				type="file"
				accept="image/*"
				id="file"
				name="file"
				bind:this={inputFile}
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
	<div slot="commands" class="cluster commands">
		<button type="submit" class="button" form="imageForm">Save</button>
	</div>
</Modal>

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
</style>
