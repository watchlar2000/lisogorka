<script>
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<main class="wrapper">
	{@render children()}
</main>
