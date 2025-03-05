<script lang="ts">
	import { page } from '$app/state';
	import { PAGE } from '$lib/constants';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { ChevronDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Button from '../Ui/Button.svelte';

	let showDropdown = $state(false);
	let dropdownButton = $state<HTMLElement>();
	let dropdownMenu = $state<HTMLElement>();
	let dropdownItems = $state<HTMLAnchorElement[]>([]);

	const toggleDropdown = () => {
		if (showDropdown) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	const showDropdownMenu = async () => {
		showDropdown = true;
		await tick();
	};

	const focusCurrentOrFirstDropdownItem = (items: HTMLAnchorElement[]) => {
		const currentPageItem = items.find(
			(item) => item.getAttribute('aria-current') === PAGE,
		);
		if (currentPageItem) {
			currentPageItem.focus();
		} else if (items.length > 0) {
			items[0].focus();
		}
	};

	const openDropdown = async () => {
		await showDropdownMenu();
		dropdownItems = getDropdownItems();
		focusCurrentOrFirstDropdownItem(dropdownItems);
	};

	const closeDropdown = () => {
		showDropdown = false;
	};

	const closeDropdownAndFocus = () => {
		closeDropdown();

		if (dropdownButton) {
			dropdownButton.focus();
		}
	};

	const getDropdownItems = (): HTMLAnchorElement[] => {
		const nodes = dropdownMenu?.querySelectorAll(
			'a',
		) as unknown as HTMLAnchorElement[];
		return [...nodes];
	};

	// const focusFirstDropdownItem = (items: HTMLAnchorElement[]) => {
	// 	if (items.length > 0) {
	// 		items[0].focus();
	// 	}
	// };

	const handleKeydown = async (event: KeyboardEvent) => {
		const { key } = event;
		const currentIndex = dropdownItems.indexOf(
			document.activeElement as HTMLAnchorElement,
		);

		const moveFocus = (step: number) => {
			event.preventDefault();
			const nextIndex =
				(currentIndex + step + dropdownItems.length) % dropdownItems.length;
			dropdownItems[nextIndex]?.focus();
		};

		switch (key) {
			case 'Escape':
				closeDropdownAndFocus();
				break;
			case 'ArrowDown':
				moveFocus(1);
				break;
			case 'ArrowUp':
				moveFocus(-1);
				break;
			case 'Tab':
				moveFocus(event.shiftKey ? -1 : 1);
				break;
		}
	};

	const handleSubMenuClick = (event: MouseEvent) => {
		if (
			event.target instanceof Element &&
			event.target.closest('.dropdown-menu')
		) {
			closeDropdown();
		}
	};

	const isCurrentPage = (path: string) =>
		page.url.pathname === path ? PAGE : undefined;
</script>

<nav aria-label="Primary Navigation">
	<ul class="cluster" role="list">
		<li>
			<Button
				as="a"
				href="/"
				variant="ghost"
				size="small"
				aria-current={isCurrentPage('/')}
				class="nav-item"
			>
				Home
			</Button>
		</li>
		<li class="dropdown" use:clickOutside={closeDropdown}>
			<Button
				onclick={toggleDropdown}
				aria-expanded={showDropdown}
				aria-controls="work-options"
				bind:node={dropdownButton}
				variant="ghost"
				size="small"
				class="dropdown-button nav-item"
			>
				Works
				<ChevronDown aria-hidden="true" />
			</Button>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			{#if showDropdown}
				<ul
					id="work-options"
					role="list"
					class="dropdown-menu"
					bind:this={dropdownMenu}
					onkeydown={handleKeydown}
					onclick={handleSubMenuClick}
					transition:fly={{ y: -10, duration: 125, easing: cubicOut }}
				>
					<li data-menu-item>
						<Button
							as="a"
							href="/visual-development"
							variant="ghost"
							size="small"
							aria-current={isCurrentPage('/visual-development')}
							class="dropdown-item nav-item"
						>
							Visual development
						</Button>
					</li>
					<li data-menu-item>
						<Button
							as="a"
							href="/background-painting"
							variant="ghost"
							size="small"
							aria-current={isCurrentPage('/background-painting')}
							class="dropdown-item nav-item"
						>
							Background painting
						</Button>
					</li>
				</ul>
			{/if}
		</li>
		<li>
			<Button
				as="a"
				href="/playground"
				aria-current={isCurrentPage('/playground')}
				variant="ghost"
				size="small"
				class="nav-item"
			>
				Playground
			</Button>
		</li>
		<li>
			<Button
				as="a"
				href="/about"
				aria-current={isCurrentPage('/about')}
				variant="ghost"
				size="small"
				class="nav-item"
			>
				About
			</Button>
		</li>
	</ul>
</nav>

<style>
	nav .cluster {
		--gutter: 0;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		--_padding: var(--space-2xs);
		--gutter: var(--_padding);

		padding: var(--_padding);
		background-color: var(--color-light);
		border-radius: var(--radius-m);
		box-shadow: var(--shadow-xl);
		z-index: 9999;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
	}

	.dropdown-menu li {
		border-radius: var(--radius-m);
	}

	:global(.dropdown-button svg) {
		height: 1lh;
		transition: transform 0.125s ease;
	}

	:global(.dropdown-button[aria-expanded='true'] svg) {
		transform: rotate(180deg);
	}

	:global(.nav-item):focus-visible {
		outline: none;
		background-image: var(--gradient-accent);
	}
</style>
