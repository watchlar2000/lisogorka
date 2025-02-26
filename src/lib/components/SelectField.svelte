<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';

	type SelectFieldProps = {
		title: string;
		options: string[];
		selectedValue: string;
		error?: string;
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

<div class="repel" class:invalid={error}>
	<label for={title} class="label {labelClass}"
		>{capitalizeFirstLetter(title)}</label
	>
	{#if error}
		<span>{error}</span>
	{/if}
</div>

<select {...rest} class={selectClass}>
	{#each options as option}
		<option value={option} selected={selectedValue === option}>{option}</option>
	{/each}
</select>
