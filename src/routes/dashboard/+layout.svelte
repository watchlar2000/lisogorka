<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Ui/Button.svelte';

	let { children } = $props();
</script>

<div class="container flow">
	<header class="header wrapper repel">
		<h2 class="title"><a href="/dashboard">Dashboard</a></h2>
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
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		padding-bottom: var(--space-l);
	}

	.container > * {
		width: 100%;
	}

	.wrapper[data-wrapper-type='inner'] {
		background-color: #fefefe;
		border-radius: var(--radius-m);
	}

	.title {
		color: var(--color-surface-text-interact);
		font-size: var(--text-size-meta);
		text-transform: uppercase;
		letter-spacing: var(--kerning-uppercase);
	}

	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
	}

	.wrapper[data-wrapper-type='inner'] {
		flex-grow: 1;
	}
</style>
