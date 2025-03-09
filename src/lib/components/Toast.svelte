<script lang="ts">
	import { getToastState } from '$lib/services/toast/toast.svelte';
	import type { Toast } from '$lib/services/toast/toast.types';
	import { X } from 'lucide-svelte';
	import Button from './Ui/Button.svelte';

	type ToastProps = {
		toast: Toast;
	};

	const { toast }: ToastProps = $props();
	const { id, title, message, type } = $derived(toast);
	const toastState = getToastState();
	const removeToast = () => toastState.remove(id);
</script>

<div class="toast flow" data-type={type}>
	<div class="repel">
		<span class="toast-title">{title}</span>
		<Button
			size="small"
			variant="secondary"
			class="close-button"
			onclick={removeToast}
		>
			<X aria-hidden />
			<span class="visually-hidden">Close toast</span>
		</Button>
	</div>
	<div>
		<span class="toast-message">{message}</span>
	</div>
</div>

<style>
	.toast {
		background-color: var(--color-blue);
		color: var(--color-light-tint);
		padding: var(--space-2xs);
		font-size: var(--text-size-meta);
		font-family: var(--font-display);
		border: 3px solid var(--color-dark-tint);
		box-shadow: var(--shadow-xl);
	}

	.toast[data-type='warning'] {
		background-color: var(--color-danger);
	}

	.repel {
		--repel-wrap: no-wrap;
	}

	.toast-title {
		font-weight: var(--font-semibold);
	}

	.toast-message {
		font-size: var(--text-size-lede);
	}

	:global(.close-button) {
		color: inherit;
	}
</style>
