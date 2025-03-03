<script lang="ts">
	import { page } from '$app/state';
	import { PAGE } from '$lib/constants';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { ChevronDown } from 'lucide-svelte';
	import { tick } from 'svelte';
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

	const openDropdown = async () => {
		await showDropdownMenu();
		dropdownItems = getDropdownItems();
		focusFirstDropdownItem(dropdownItems);
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

	const focusFirstDropdownItem = (items: HTMLAnchorElement[]) => {
		if (items.length > 0) {
			items[0].focus();
		}
	};

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
				size="medium"
				aria-current={isCurrentPage('/')}
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
				size="medium"
			>
				Works
				<ChevronDown aria-hidden="true" />
			</Button>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			{#if showDropdown}
				<ul
					id="work-options"
					role="list"
					class="cluster dropdown-menu"
					bind:this={dropdownMenu}
					onkeydown={handleKeydown}
					onclick={handleSubMenuClick}
				>
					<li data-menu-item>
						<Button
							as="a"
							href="/visual-development"
							variant="ghost"
							size="medium"
							aria-current={isCurrentPage('/visual-development')}
						>
							Visual development
						</Button>
					</li>
					<li data-menu-item>
						<Button
							as="a"
							href="/background-painting"
							variant="ghost"
							size="medium"
							aria-current={isCurrentPage('/background-painting')}
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
				size="medium"
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
				size="medium"
			>
				About
			</Button>
		</li>
	</ul>
</nav>

<style>
	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		--gutter: var(--space-2xs);

		background-color: #fefefe;
		border-radius: calc(var(--radius-l) * 0.6);
		box-shadow: 0px 0px 20px 16px rgba(17, 17, 26, 0.05);
		z-index: 9999;
		position: absolute;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.dropdown-menu li {
		min-width: 20ch;
		border-radius: var(--radius-m);
		padding: var(--space-2xs);
	}
</style>
