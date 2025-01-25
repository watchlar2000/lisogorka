<script>
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<main class="wrapper">
	{@render children()}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
	}
</style>
