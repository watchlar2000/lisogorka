<script>
	import { page } from '$app/state';
	import Button from '$lib/components/Ui/Button.svelte';
</script>

<div class="wrapper cluster">
	<h1 class="cluster">
		{page?.error?.status ?? 500} |
		<span>Sorry</span>
	</h1>
	<span>
		{page?.error?.message}
	</span>
	<div class="go-back">
		<Button as="a" href="/" size="small" variant="secondary">
			Go to main page
		</Button>
	</div>
</div>

<style>
	.wrapper {
		--wrapper-max-width: 40rem;
		--cluster-horizontal-alignment: center;

		min-height: 100vh;
		display: grid;
		place-content: center;
		font-family: var(--font-display);
	}

	.cluster {
		--cluster-wrap: nowrap;
	}

	h1 {
		color: var(--color-dark-tint);
		font-weight: var(--font-semibold);
	}

	h1 span {
		color: var(--color-blue);
	}

	.go-back {
		width: max-content;
		margin-inline: auto;
	}
</style>
