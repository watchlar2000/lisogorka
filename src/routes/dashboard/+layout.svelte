<script>
	import { enhance } from '$app/forms';
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Ui/Button.svelte';

	let { children } = $props();
</script>

<div class="container flow">
	<header class="header">
		<div class="wrapper repel">
			<a href="/dashboard" class="header-logo">Dashboard</a>
			<div class="cluster">
				<form method="POST" action="logout?/logout" use:enhance>
					<Button variant="secondary" type="submit" size="small">Logout</Button>
				</form>
			</div>
		</div>
	</header>
	<div class="wrapper content">
		{@render children()}
	</div>
	<Footer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background-image: var(--gradient-accent);
	}

	.container > * {
		width: 100%;
	}

	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
		width: 100%;
	}

	.header {
		padding-block: var(--space-m);
		background-color: var(--color-light-muted);
	}

	.header-logo {
		color: var(--color-dark-tint);
		text-transform: uppercase;
		text-decoration: none;
		font-size: var(--text-size-meta);
	}
</style>
