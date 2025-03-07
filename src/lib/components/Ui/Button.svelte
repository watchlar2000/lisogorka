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
		size?: 'x-small' | 'small' | 'regular' | 'large' | 'medium';
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

	[data-variant-type]:hover {
		--opacity-state: var(--opacity-hover);
	}

	[data-variant-type]:focus {
		--opacity-state: var(--opacity-focus);
	}

	[data-variant-type]:active {
		--opacity-state: var(--opacity-active);
	}

	[data-variant-type='primary'] {
		--opacity-state: var(--opacity-default);
		--button-bg: rgba(var(--color-blue-rgb), var(--opacity-state));
	}

	[data-variant-type='secondary'] {
		--opacity-state: 0.15;
		--button-bg: rgba(var(--color-dark-rgb), var(--opacity-state));
		--button-text: var(--color-dark);
	}

	[data-variant-type='secondary']:hover {
		--opacity-state: 0.2;
	}

	[data-variant-type='secondary']:focus {
		--opacity-state: 0.175;
	}

	[data-variant-type='secondary']:active {
		--opacity-state: 0.125;
	}

	[data-variant-type='destructive'] {
		--opacity-state: var(--opacity-default);

		--button-bg: rgba(var(--color-red-rgb), var(--opacity-state));
		--button-text: var(--color-light);
	}

	[data-variant-type='ghost'] {
		--button-bg: ;
		--button-text: var(--color-global-text);
	}

	[data-variant-type='ghost']:hover {
		--opacity-state: 0.8;
		--button-text: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-variant-type='ghost']:focus {
		--opacity-state: 0.75;
		--button-text: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-variant-type='ghost']:active {
		--opacity-state: 0.65;
		--button-text: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-variant-type='outline'] {
		--opacity-state: var(--opacity-default);

		--button-bg: ;
		--button-text: var(--color-dark);
		border: var(--stroke-solid);
	}

	[data-variant-type='outline']:hover {
		--opacity-state: 0.8;
		--button-text: rgba(var(--color-dark-rgb), var(--opacity-state));
		border-color: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-variant-type='outline']:focus {
		--opacity-state: 0.75;
		border-color: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-variant-type='outline']:active {
		--opacity-state: 0.65;
		border-color: rgba(var(--color-dark-rgb), var(--opacity-state));
	}

	[data-font-size='x-small'] {
		font-size: var(--text-size-lede);
		padding-inline: 0;
		padding-block: 0.25ch;
	}

	[data-font-size='small'] {
		font-size: var(--text-size-lede);
	}

	[data-font-size='regular'] {
		font-size: var(--text-size-meta);
	}

	[data-font-size='medium'] {
		font-size: var(--step-0);
	}

	[data-font-size='large'] {
		font-size: var(--text-size-base);
	}
</style>
