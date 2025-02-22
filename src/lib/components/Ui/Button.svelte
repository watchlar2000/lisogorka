<script lang="ts">
	import { Loader } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: () => void;
		disabled?: boolean;
		loading?: boolean;
		children: Snippet;
	};

	const {
		type = 'button',
		class: className = '',
		onclick,
		disabled = false,
		loading = false,
		children,
	}: ButtonProps = $props();
</script>

<button
	{type}
	class="button {className}"
	{onclick}
	disabled={disabled || loading}
>
	{#if loading}
		<div class="cluster">
			<Loader class="spinner" aria-hidden={true} />
			<span>Processing</span>
		</div>
	{:else}
		{@render children()}
	{/if}
</button>

<style>
	.cluster {
		--gutter: var(--space-s);
	}

	:global(.spinner) {
		transform-origin: center;
		animation: spin 1.5s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
