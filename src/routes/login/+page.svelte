<div class="sign-in flow">
	<h3>Sign In to continue*</h3>
	<p class="prose">
		*If you are not the owner of this website, please go back to the <a href="/"
			>main page</a
		>
	</p>
	<a href="/login/google" class="sign-in__link button cluster">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="icon"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline
				points="10 17 15 12 10 7"
			/><line x1="15" x2="3" y1="12" y2="12" /></svg
		>
		Sign in with Google
	</a>
</div>

<style>
	.sign-in {
		display: grid;
		place-content: center;
		min-height: 100%;
		max-width: 20ch;
		margin-inline: auto;
		padding-block: var(--space-l);
	}

	p {
		font-size: var(--text-size-meta);
	}

	.sign-in__link {
		color: var(--color-global-bg);
		justify-content: center;
		text-transform: capitalize;
		border-radius: var(--radius-m);
	}
</style>
