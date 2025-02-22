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
		options: string[];
		selectedValue: string;
		error: Snippet<[T]>;
		class?: {
			wrapperClass?: string;
			labelClass?: string;
			selectClass?: string;
		};
	};

	let {
		title,
		options,
		selectedValue,
		error,
		class: className,
		...rest
	}: FormInputProps = $props();

	const {
		wrapperClass = '',
		labelClass = '',
		selectClass = '',
	} = $derived(className ?? {});
</script>

<div class="flow {wrapperClass}">
	<label for={title} class="label {labelClass}"
		>{capitalizeFirstLetter(title)}</label
	>
	<select {...rest} class={selectClass}>
		{#each options as option}
			<option value={option} selected={selectedValue === option}
				>{option}</option
			>
		{/each}
	</select>
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
