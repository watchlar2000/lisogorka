import type {
	FormImageInputValues,
	FormImageState,
} from '$lib/types/new-project';
import type { Snippet } from 'svelte';

export type ImageModalProps = {
	form: FormImageState;
	onSave: (params: { alt: string; file: File | null }) => boolean;
	imagePreview: Snippet;
};

export type FormInputValues = FormImageInputValues;
