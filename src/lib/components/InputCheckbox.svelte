<script lang="ts">
	let { isFeatured = $bindable() } = $props();

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			isFeatured = !isFeatured;
		}
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label
	for="isFeatured"
	class="toggle cluster"
	tabindex="0"
	onkeydown={handleKeydown}
>
	<input
		type="checkbox"
		name="isFeatured"
		id="isFeatured"
		bind:checked={isFeatured}
		class="hidden-checkbox"
		tabindex="-1"
	/>
	<span class="slider"></span>
	{isFeatured ? 'Active' : 'Disabled'}
</label>

<style>
	.toggle {
		font-size: inherit;
		width: max-content;
		padding-block: var(--space-2xs);
		user-select: none;
		cursor: pointer;
	}

	.hidden-checkbox {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	.hidden-checkbox:checked + .slider {
		background: var(--color-blue);
	}

	.slider {
		width: 50px;
		height: 25px;
		background: var(--color-blue-muted);
		border-radius: 25px;
		position: relative;
		transition: background 0.3s;
	}

	.slider::before {
		content: '';
		width: 20px;
		height: 20px;
		background: var(--color-light);
		border-radius: 50%;
		position: absolute;
		left: 3px;
		top: 50%;
		transform: translateY(-50%);
		transition: transform 0.3s;
	}

	.hidden-checkbox:checked + .slider::before {
		transform: translate(24px, -50%);
	}
</style>
