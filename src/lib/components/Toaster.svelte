<script lang="ts">
	import { getToastState } from '$lib/services/toast/toast.svelte';
	import { fade, fly } from 'svelte/transition';
	import Toast from './Toast.svelte';

	const toastState = getToastState();
</script>

<div class="toaster cluster">
	{#each toastState.toasts as toast}
		<div in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 250 }}>
			<Toast {toast} />
		</div>
	{/each}
</div>

<style>
	.cluster {
		--cluster-direction: column;
		--cluster-vertical-alignment: flex-end;
		--gutter: var(--space-s);
	}

	.toaster {
		position: fixed;
		right: var(--space-s);
		left: var(--space-s);
		top: var(--space-s);
		z-index: 9999999999;
		pointer-events: none;
	}

	.toaster > * {
		pointer-events: auto;
	}
</style>
