<script lang="ts">
	import { page } from '$app/state';
	import { createDropdownMenu } from '@melt-ui/svelte';

	const {
		elements: { trigger, menu, item, overlay },
	} = createDropdownMenu({
		preventScroll: false,
		loop: true,
	});

	function isCurrentPage(path: string) {
		return page.url.pathname === path ? 'page' : undefined;
	}
</script>

<nav aria-label="Primary" class="nav">
	<ul class="cluster" role="list">
		<li>
			<a href="/" aria-current={isCurrentPage('/')} class="menu__item">Home</a>
		</li>
		<li>
			<button
				type="button"
				{...$trigger}
				use:trigger
				aria-label="Works"
				class="button menu__item"
			>
				Works
			</button>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div {...$overlay} use:overlay />
			<ul {...$menu} use:menu class="cluster dropdown__menu" role="list">
				<li {...$item} use:item>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" class="menu__item">Visual development</a>
				</li>
				<li {...$item} use:item>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" class="menu__item">Background painting</a>
				</li>
			</ul>
		</li>
		<li>
			<a
				href="/playground"
				aria-current={isCurrentPage('/playground')}
				class="menu__item">Playground</a
			>
		</li>
		<li>
			<a href="/about" aria-current={isCurrentPage('/about')} class="menu__item"
				>About</a
			>
		</li>
	</ul>
</nav>

<style>
	.nav {
		--gutter: var(--space-l) var(--space-xl);
		font-size: var(--text-size-heading-4);

		line-height: var(--leading-loose);
	}

	.nav a:not(:hover):not([aria-current='page']) {
		text-decoration: none;
	}

	.dropdown__menu {
		--cluster-direction: column;
		--gutter: var(--space-s);

		background-color: #fff;
		padding: var(--space-m);
	}

	.dropdown__menu li {
		width: 100%;
		text-align: center;
	}

	.menu__item {
		--focus-color: var(--color-primary);

		background-color: var(--color-bg-global);
		display: inline-block;
		text-decoration: none;
		font-size: var(--text-size-heading-4);
		text-transform: capitalize;
		font-weight: var(--font-regular);
		padding: 0.25rem 1rem;
		line-height: var(--leading);

		transition: background 0.125s ease;
	}

	.menu__item:active {
		background-color: var(--color-mid);
	}

	.menu__item:focus-visible {
		background-color: var(--color-mid);
	}

	.menu__item[aria-current='page'] {
		color: var(--color-global-bg);
		background-color: var(--color-global-text);
	}
</style>
