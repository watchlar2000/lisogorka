<script lang="ts">
	import { page } from '$app/state';
	import { ROUTE } from '$lib/config';
	import { PAGE } from '$lib/constants';
	import Logo from './Logo.svelte';
	import Button from './Ui/Button.svelte';

	const { home, about, backgroundPainting, visualDevelopment, playground } =
		ROUTE;

	const isCurrentPage = (path: string) =>
		page.url.pathname === path ? PAGE : undefined;
</script>

<footer class="footer">
	<div class="wrapper flow">
		<div class="repel">
			<Logo size="small" />
			<nav aria-label="Secondary Footer Navigation">
				<ul role="list" class="flow footer-nav">
					<li>
						<Button
							as="a"
							href={home}
							size="x-small"
							variant="ghost"
							aria-current={isCurrentPage(home)}
						>
							Home
						</Button>
					</li>
					<li>
						<Button
							as="a"
							href={backgroundPainting}
							size="x-small"
							variant="ghost"
							aria-current={isCurrentPage(backgroundPainting)}
						>
							Background painting
						</Button>
					</li>
					<li>
						<Button
							as="a"
							href={visualDevelopment}
							size="x-small"
							variant="ghost"
							aria-current={isCurrentPage(visualDevelopment)}
						>
							Visual development
						</Button>
					</li>
					<li>
						<Button
							as="a"
							href={playground}
							size="x-small"
							variant="ghost"
							aria-current={isCurrentPage(playground)}
						>
							Playground
						</Button>
					</li>
					<li>
						<Button
							as="a"
							href={about}
							size="x-small"
							variant="ghost"
							aria-current={isCurrentPage(about)}
						>
							About
						</Button>
					</li>
				</ul>
			</nav>
		</div>
		<div class="footer-copy">
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

	.footer-nav {
		--flow-space: var(--space-2xs);
	}

	:global(.footer-nav a) {
		--_opacity: var(--opacity-default);

		justify-self: flex-start;
		font-family: var(--font-display);
		font-weight: var(--font-regular);
		color: rgba(var(--color-light-rgb), var(--_opacity));
		text-decoration-color: var(--color-light-muted);
	}

	:global(.footer-nav a:hover) {
		--_opacity: var(--opacity-hover);
	}

	:global(.footer-nav a:focus) {
		--_opacity: var(--opacity-focus);
	}

	:global(.footer-nav a:active) {
		--_opacity: var(--opacity-active);
	}

	.repel {
		--repel-vertical-alignment: flex-start;
	}

	.footer-copy {
		font-size: 0.9rem;
	}
</style>
