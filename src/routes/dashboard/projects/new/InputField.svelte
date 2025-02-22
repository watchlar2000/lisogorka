<script lang="ts" module>
	type T = string;
</script>

<script lang="ts" generics="T extends string">
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';
	import type { Snippet } from 'svelte';

	type InputFieldProps = {
		type: 'text' | 'email' | 'password';
		title: T;
		value: string;
		placeholder: string;
		error: Snippet<[T]>;
		class?: {
			labelClass?: string;
			inputClass?: string;
		};
	};

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

<label for={title} class="label {labelClass}"
	>{capitalizeFirstLetter(title)}:</label
>
<input {type} bind:value {...rest} class={inputClass} {placeholder} />
{@render error(title)}
