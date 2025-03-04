<script>
	import Logo from './Logo.svelte';
</script>

<footer class="footer">
	<div class="wrapper repel">
		<Logo size="small" />
		<div>
			<p>All artistic content Copyright &#169;</p>
			<p>2025 Iryna Lisogor, All rights</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		font-family: var(--font-display);
		font-size: var(--text-size-meta);
		margin-top: var(--space-l-3xl);
		background-color: var(--color-global-text);
		color: var(--color-light-tint);
	}

	.footer p {
		font-size: var(--text-size-lede);
	}

	.wrapper {
		padding-inline: var(--gutter);
		padding-block: var(--space-l);
	}
</style>
