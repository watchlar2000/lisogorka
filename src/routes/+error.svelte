<script>
	import { page } from '$app/state';
	import Button from '$lib/components/Ui/Button.svelte';
</script>

<div class="wrapper flow">
	<h1 class="cluster">
		{page?.error?.status ?? 500} |
		<span>{page?.error?.message}</span>
	</h1>
	<div>
		<Button as="a" href="/" size="small" variant="regular">
			Go to main page
		</Button>
	</div>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		display: grid;
		place-content: center;
	}

	.cluster {
		--cluster-wrap: nowrap;
	}

	h1 {
		color: var(--color-blue);
	}

	h1 span {
		font-size: var(--text-size-meta);
		color: var(--color-dark-tint);
		font-weight: var(--font-semibold);
	}
</style>
