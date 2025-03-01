<script lang="ts">
	type BadgeProps = {
		label: string;
		isActive: boolean;
	};

	const { label, isActive }: BadgeProps = $props();
</script>

<span class="label" data-active={isActive ?? undefined}>{label}</span>

<style>
	.label {
		padding: 0.1em 0.8em;
		display: inline-block;
		border-radius: var(--radius-m);
		font-size: var(--font-size-lede);
		font-weight: var(--font-regular);
		color: var(--color-global-bg);
		background-color: rgb(187, 146, 214);
	}

	.label[data-active='true'] {
		background-color: var(--color-primary);
	}
</style>
