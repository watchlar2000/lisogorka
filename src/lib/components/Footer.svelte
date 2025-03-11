<script lang="ts">
	import { page } from '$app/state';
	import { ROUTE } from '$lib/config';
	import { PAGE } from '$lib/constants';
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';
	import Logo from './Logo.svelte';
	import Button from './Ui/Button.svelte';

	const routes = Object.entries(ROUTE).map(([title, href]) => ({
		title: capitalizeFirstLetter(title),
		href,
	}));

	const isCurrentPage = (path: string) =>
		page.url.pathname === path ? PAGE : undefined;
</script>

<footer class="footer">
	<div class="wrapper flow">
		<div class="repel">
			<div class="footer-logo">
				<Logo size="small" />
			</div>
			<nav aria-label="Secondary Footer Navigation">
				<ul role="list" class="cluster footer-nav">
					{#each routes as route (route.title)}
						<li>
							<Button
								as="a"
								href={route.href}
								size="x-small"
								variant="ghost"
								aria-current={isCurrentPage(route.href)}
							>
								{route.title}
							</Button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
	<div class="footer-copy">
		<div class="wrapper">
			<p>All artistic content Copyright &#169;</p>
			<p>{new Date().getFullYear()} Iryna Lisogor, All rights</p>
		</div>
	</div>
</footer>

<style>
	.footer > .wrapper {
		padding-inline: var(--gutter);
		padding-block: var(--space-l);
	}
	.footer {
		--flow-space: var(--space-m);

		font-family: var(--font-display);
		font-size: var(--text-size-lede);
		margin-top: var(--space-l-3xl);
		background-color: var(--color-dark);
		color: var(--color-light-tint);
	}

	.footer-nav {
		--cluster-direction: column;
		--gutter: var(--space-2xs);
		--cluster-vertical-alignment: flex-start;
	}

	:global(.footer-nav a) {
		--_opacity: var(--opacity-default);

		font-weight: var(--font-regular);
		color: rgba(var(--color-light-rgb), var(--_opacity));
		text-decoration: none;
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
		padding-block: var(--space-s);
		font-weight: var(--font-light);
		background-color: rgb(25, 25, 25);
	}

	.footer-logo {
		padding-block: 0.5rem;
	}
</style>
