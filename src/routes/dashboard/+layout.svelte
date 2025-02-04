<script>
	import { enhance } from '$app/forms';

	let { children } = $props();
</script>

<div class="container flow">
	<header class="header wrapper repel">
		<h2 class="title">Dashboard</h2>
		<div class="cluster">
			<form method="POST" use:enhance>
				<button class="button button__logout">Logout</button>
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
	.wrapper[data-wrapper-type='inner'] {
		background-color: #fefefe;
		border-radius: var(--radius-l);
	}

	.button__logout {
		--button-bg: var(--color-surface-text);
		--button-text: var(--color-global-bg);

		font-size: var(--text-size-meta);
	}

	.title {
		color: var(--color-surface-text-interact);
		font-size: var(--text-size-meta);
		text-transform: uppercase;
		letter-spacing: var(--kerning-uppercase);
	}

	/* .header {
		--wrapper-max-width: 60ch;

		width: 100%;
	}

	.header h2 {
		color: var(--color-surface-text-interact);
		font-size: var(--text-size-meta);
		text-transform: uppercase;
		letter-spacing: var(--kerning-uppercase);
	}

	.button__logout {
		--button-bg: var(--color-surface-text);
		--button-text: var(--color-global-bg);

		font-size: var(--text-size-meta);
	}
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		width: 100%;
		padding-bottom: var(--space-l);
	}

	.container > * {
		width: 100%;
	}

	.container .wrapper {
		--wrapper-max-width: 60ch;
	}

	.content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
	}

	.wrapper[data-wrapper-type='inner'] {
		/* --wrapper-max-width: 60ch; */

	/* flex-grow: 1;
		background-color: #fefefe;
		border-radius: var(--radius-l);
		height: 100%;
	}  */
</style>
