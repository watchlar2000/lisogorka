<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';

	let { children } = $props();
</script>

<div class="container flow">
	<div class="wrapper">
		<Header />
	</div>
	<div class="wrapper content">
		{@render children()}
	</div>
	<div class="wrapper">
		<Footer />
	</div>
</div>

<style>
	.container {
		--flow-space: var(--space-regions);

		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.container > * {
		width: 100%;
	}

	.content {
		flex-grow: 1;
	}
</style>
