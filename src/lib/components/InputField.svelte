<script lang="ts" generics="T extends string">
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type InputFieldProps = {
		type: 'text' | 'email' | 'password';
		title: string;
		value: string;
		error?: string;
		placeholder?: string;
		class?: {
			labelClass?: string;
			inputClass?: string;
		};
	} & HTMLInputAttributes;

	let {
		type,
		title,
		value = $bindable(),
		placeholder,
		error,
		class: className,
		...rest
	}: InputFieldProps = $props();

	const { labelClass = '', inputClass = '' } = $derived(className ?? {});
</script>

<div class="repel" class:invalid={error}>
	<label for={title} class="label {labelClass}">
		{capitalizeFirstLetter(title)}:
	</label>
	{#if error}
		<span>{error}</span>
	{/if}
</div>
<input
	{type}
	bind:value
	{...rest}
	class={inputClass}
	data-invalid={error ? true : undefined}
	{placeholder}
/>
