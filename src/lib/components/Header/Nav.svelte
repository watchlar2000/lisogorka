<script lang="ts">
	import { page } from '$app/state';
	import { PAGE } from '$lib/constants';
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { trigger, menu, item, overlay },
	} = createDropdownMenu({
		preventScroll: false,
		loop: true,
		positioning: {
			gutter: 0,
			placement: 'bottom',
		},
	});

	const isCurrentPage = (path: string) =>
		page.url.pathname === path ? PAGE : undefined;
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
				aria-label="Open works menu"
				class="menu__item button dropdown__button"
			>
				Works
				<svg
					aria-hidden="true"
					focusable="false"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg
				>
			</button>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div {...$overlay} use:overlay />
			<ul
				{...$menu}
				use:menu
				class="cluster dropdown__menu"
				role="list"
				transition:fly={{ duration: 150, y: -10 }}
			>
				<li {...$item} use:item>
					<a href="/visual-development" class="menu__item">Visual development</a
					>
				</li>
				<li {...$item} use:item>
					<a href="/background-painting" class="menu__item"
						>Background painting</a
					>
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
	.nav a:not(:hover):not([aria-current='page']) {
		text-decoration: none;
	}

	.nav .cluster {
		--gutter: var(--space-m);
	}

	.dropdown__menu {
		--cluster-direction: column;
		--gutter: var(--space-s);

		background-color: #fff;
		padding: var(--space-s);
		border-radius: var(--radius-m);
		box-shadow: 0px 0px 20px 16px rgba(17, 17, 26, 0.01);
	}

	.dropdown__menu li {
		width: 100%;
		text-align: center;
	}

	.menu__item {
		width: 100%;
		color: var(--color-global-text);
		background-color: var(--color-bg-global);
		display: inline-block;
		text-decoration: none;
		font-size: var(--step-0);
		text-transform: capitalize;
		font-weight: var(--font-regular);
		border-radius: var(--radius-m);
		padding: var(--space-3xs) var(--space-m);
		line-height: var(--leading);

		transition: background 0.125s ease;
	}

	.menu__item:active {
		background-color: var(--color-mid);
	}

	.menu__item:focus-visible {
		--focus-color: var(--color-global-text);

		background-color: var(--color-mid);
	}

	.menu__item[aria-current='page'] {
		color: var(--color-global-bg);
		background-color: var(--color-global-text);
	}

	.dropdown__button {
		display: flex;
		gap: var(--space-s);
	}

	.dropdown__button svg {
		height: 1lh;
		transition: transform 0.2s ease;
	}

	.dropdown__button[aria-expanded='true'] svg {
		transform: rotate(180deg);
	}
</style>
