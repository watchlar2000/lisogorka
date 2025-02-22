<script lang="ts" module>
	type T = string;
</script>

<script lang="ts" generics="T extends string">
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';
	import type { Snippet } from 'svelte';

	type SelectFieldProps = {
		title: T;
		options: string[];
		selectedValue: string;
		error: Snippet<[T]>;
		class?: {
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
	}: SelectFieldProps = $props();

	const { labelClass = '', selectClass = '' } = $derived(className ?? {});
</script>

<label for={title} class="label {labelClass}"
	>{capitalizeFirstLetter(title)}</label
>
<select {...rest} class={selectClass}>
	{#each options as option}
		<option value={option} selected={selectedValue === option}>{option}</option>
	{/each}
</select>
{@render error(title)}
