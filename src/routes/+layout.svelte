<script>
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		padding-top: var(--space-l);
	}
</style>
