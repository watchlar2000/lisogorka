<script lang="ts" module>
	type T = string;
</script>

<script lang="ts" generics="T extends string">
	import type { Snippet } from 'svelte';

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	type FormInputProps = {
		title: T;
		value: string;
		placeholder: string;
		error: Snippet<[T]>;
		class?: {
			wrapperClass?: string;
			labelClass?: string;
			inputClass?: string;
		};
	};

	let {
		title,
		value = $bindable(),
		placeholder,
		error,
		class: className,
		...rest
	}: FormInputProps<string> = $props();

	const {
		wrapperClass = '',
		labelClass = '',
		inputClass = '',
	} = $derived(className ?? {});
</script>

<div class="flow {wrapperClass}">
	<label for={title} class="label {labelClass}"
		>{capitalizeFirstLetter(title)}:</label
	>
	<input type="text" bind:value {...rest} class={inputClass} {placeholder} />
	{@render error(title)}
</div>

<style>
	div {
		--flow-space: var(--space-xs);
	}

	.label {
		font-weight: var(--font-medium);
		font-size: var(--text-size-meta);
	}
</style>
