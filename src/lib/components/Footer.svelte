<script>
	import Logo from './Logo.svelte';
</script>

<footer class="footer">
	<div class="wrapper flow">
		<div class="repel">
			<Logo size="small" />
			<div>
				<ul role="list" class="footer-nav">
					<li><a href="/">Home</a></li>
					<li><a href="/background-painting">Background painting</a></li>
					<li><a href="/visual-development">Visual development</a></li>
					<li><a href="/playground">Playground</a></li>
					<li><a href="/about">About</a></li>
				</ul>
			</div>
		</div>
		<div>
			<p>All artistic content Copyright &#169;</p>
			<p>{new Date().getFullYear()} Iryna Lisogor, All rights</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		--flow-space: var(--space-m);

		font-family: var(--font-display);
		font-size: var(--text-size-lede);
		margin-top: var(--space-l-3xl);
		background-color: var(--color-global-text);
		color: var(--color-light-tint);
	}

	.wrapper {
		padding-inline: var(--gutter);
		padding-block: var(--space-l);
	}

	.footer-nav a {
		--_opacity: var(--opacity-default);
		color: rgba(var(--color-light-rgb), var(--_opacity));
		text-decoration-color: var(--color-light-muted);
		text-decoration-thickness: 0.2ex;
	}

	.footer-nav a:hover {
		--_opacity: var(--opacity-hover);
		text-decoration-color: var(--color-blue-tint);
	}

	.footer-nav a:focus {
		--_opacity: var(--opacity-focus);
	}

	.footer-nav a:active {
		--_opacity: var(--opacity-active);
	}

	.repel {
		--repel-vertical-alignment: flex-start;
	}
</style>
