<script lang="ts">
	import { Loader } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		variant?: 'regular' | 'primary' | 'secondary' | 'destructive' | 'outline';
		size?: 'small' | 'regular' | 'large' | 'medium';
		class?: string;
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
	} & HTMLButtonAttributes;

	const {
		type = 'button',
		variant = 'regular',
		size = 'regular',
		class: className = '',
		onclick,
		disabled = false,
		loading = false,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<button
	{type}
	class="button {className}"
	{onclick}
	disabled={disabled || loading}
	data-variant-type={variant}
	data-font-size={size}
	{...rest}
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
