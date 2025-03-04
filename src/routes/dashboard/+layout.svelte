<script>
	import { enhance } from '$app/forms';
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Ui/Button.svelte';

	let { children } = $props();
</script>

<div class="container">
	<header class="header wrapper repel">
		<Button
			as="a"
			href="/dashboard"
			variant="ghost"
			class="header-logo"
			tabindex={-1}
		>
			Dashboard
		</Button>

		<div class="cluster">
			<form method="POST" action="logout?/logout" use:enhance>
				<Button variant="secondary" size="small">Logout</Button>
			</form>
		</div>
	</header>
	<div class="wrapper content">
		<div class="wrapper" data-wrapper-type="inner">
			{@render children()}
		</div>
	</div>
	<Footer />
</div>

<style>
	.container {
		--flow-space: var(--space-regions);

		display: flex;
		flex-direction: column;
		min-height: 100%;
		/* background-image: var(--gradient-accent); */
	}

	.container > * {
		width: 100%;
	}

	.wrapper[data-wrapper-type='inner'] {
		background-color: #fefefe;
		border-radius: var(--radius-m);
	}

	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
	}

	.wrapper[data-wrapper-type='inner'] {
		flex-grow: 1;
		box-shadow: var(--shadow-xl);
	}

	.header {
		padding-block: var(--space-m);
	}

	:global(.header-logo.cluster) {
		--cluster-direction: column;
		--gutter: var(--space-2xs);
		--align-items: flex-start;

		text-transform: uppercase;
	}

	:global(.header-logo) {
		color: var(--color-dark-tint);
	}
</style>
