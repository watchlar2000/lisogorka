<script lang="ts">
	import { Loader } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
	} from 'svelte/elements';

	type ButtonProps = {
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'regular'
			| 'primary'
			| 'secondary'
			| 'destructive'
			| 'outline'
			| 'ghost';
		size?: 'small' | 'regular' | 'large' | 'medium';
		class?: string;
		disabled?: boolean;
		loading?: boolean;
		as?: 'a';
		href?: string;
		node?: Node;
		onclick?: () => void;
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;

	let {
		type = 'button',
		variant = 'regular',
		size = 'regular',
		class: className = '',
		onclick,
		disabled = false,
		loading = false,
		children,
		as,
		href = '',
		node = $bindable(),
		...attrs
	}: ButtonProps = $props();
</script>

{#if as === 'a'}
	<a
		{href}
		class="button cluster {className}"
		data-variant-type={variant}
		data-font-size={size}
		{...attrs}
		bind:this={node}
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		class="button cluster {className}"
		{onclick}
		disabled={disabled || loading}
		data-variant-type={variant}
		data-font-size={size}
		{...attrs}
		bind:this={node}
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
{/if}

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
