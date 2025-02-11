<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { UploadImageSchema } from './validation';

	let modal: Modal;
	let inputFile: HTMLInputElement;

	export const open = () => {
		modal.open();
	};

	const { alt, url, file, onSave }: ImageModalProps = $props();

	type ImageModalProps = {
		// id: string;
		alt: string;
		url: string;
		file: File | null;
		onSave: (image: {
			// id: string;
			alt: string;
			url: string;
			file: File | null;
		}) => void;
	};

	type FormState = {
		valid: boolean;
		errors: {
			file?: string[] | undefined;
			alt?: string[] | undefined;
		};
		values: {
			file: File | null;
			alt: string;
			url: string;
		};
	};

	const form: FormState = $state({
		valid: false,
		errors: {
			file: undefined,
			alt: undefined,
		},
		values: {
			file: null,
			alt: '',
			url: '',
		},
	});

	$effect(() => {
		form.values.alt = alt;
		form.values.url = url;
		form.values.file = file;
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const fd = new FormData(e?.currentTarget);
		const fileFromInput = fd.get('file') as File;
		const file = fileFromInput.size ? fileFromInput : form.values.file;
		const alt = String(fd.get('alt'));
		const { success, error } = UploadImageSchema.safeParse({ file, alt });

		if (!success) {
			form.errors = error.flatten().fieldErrors;
			return;
		}

		form.errors.alt = undefined;
		form.errors.file = undefined;
		onSave({
			// id: id ?? new Date().getTime(),
			alt: alt,
			file: file,
			url: URL.createObjectURL(file!),
		});
		modal.close();
	};

	export const resetForm = () => {
		form.values.file = null;
		form.values.alt = '';
		form.values.url = '';

		form.errors.file = undefined;
		form.errors.alt = undefined;

		if (inputFile) inputFile.value = '';
	};
</script>

<Modal bind:this={modal} onCloseCallback={resetForm}>
	<div slot="header" class="modal__header">
		<span>Add new image </span>
	</div>
	<form onsubmit={handleSubmit} id="imageForm" class="prose">
		<img src={form.values.url} alt="" class="image" />
		<label for="file">
			<span>Select image:</span>

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
			<span>Alternative text:</span>
			<input
				aria-invalid={form.errors.alt ? true : undefined}
				type="text"
				id="alt"
				name="alt"
				placeholder="Provide alt text..."
				bind:value={form.values.alt}
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
</style>
