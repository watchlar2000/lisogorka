<script lang="ts">
	import type { Snippet } from 'svelte';

	type ModalProps = {
		header: Snippet;
		content: Snippet;
		controls: Snippet;
		onCloseCallback?: () => void;
	};

	const {
		header,
		content,
		controls,
		onCloseCallback = () => {},
	}: ModalProps = $props();
	let dialog: HTMLDialogElement;

	export const open = () => {
		dialog.showModal();
	};

	export const close = () => {
		dialog.close();
		if (onCloseCallback) {
			onCloseCallback();
		}
	};
</script>

<dialog bind:this={dialog} onclose={close}>
	<div class="wrapper flow" data-wrapper-type="inner">
		<header class="repel">
			{@render header()}
			<button class="button button__close" onclick={close}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="36"
					height="36"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="m15 9-6 6" />
					<path d="m9 9 6 6" />
				</svg>
				<span class="visually-hidden">Close dialog window</span>
			</button>
		</header>
		{@render content()}
		<hr />
		{@render controls()}
	</div>
</dialog>

<style>
	dialog {
		--dialog-width: 40ch;

		width: var(--dialog-width);
		border-radius: var(--radius-m);
		border: none;
		padding: 0px;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(3px);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.button__close {
		--button-bg: ;
		--button-text: var(--color-global-text);
		--focus-color: var(--color-primary);

		padding: var(--space-3xs);
		border-radius: 50%;
	}
</style>
