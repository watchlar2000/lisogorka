<script>
	import { page } from '$app/state';
</script>

<div class="wrapper flow">
	<h1>
		<span>{page.status} |</span>
		Sorry
	</h1>
	<span>{page?.error?.message}</span>
</div>

<style>
	.wrapper {
		--wrapper-max-width: 30rem;

		min-height: 100vh;
		display: grid;
		place-content: center;
	}

	h1 {
		color: var(--color-blue);
	}

	h1 span {
		color: var(--color-dark-tint);
		font-weight: var(--font-semibold);
	}
</style>
