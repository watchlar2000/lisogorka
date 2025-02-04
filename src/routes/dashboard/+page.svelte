<script lang="ts">
	const { data } = $props();

	const projects = $derived(data.projects);

	const parseDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		});
	};
</script>

<div class="flow">
	<h6 class="title"><span>🏗️</span> Projects</h6>
	<hr />
	<div>
		<ul role="list" class="auto-grid cards__list">
			{#each projects as p}
				<li class="card flow">
					<!-- <div class="cluster"> -->
					<div class="prose card__meta flow">
						<img src={p.coverImage?.url} alt="" class="card__cover" />
						<p class="card__title">{p.title}</p>
						<div class="repel">
							<p class="card__meta--label">
								{p.isFeatured ? 'active' : 'disabled'}
							</p>
							<p>{parseDate(p.createdAt)}</p>
						</div>
					</div>
					<button class="button button__edit"
						><svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-pencil"
							><path
								d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
							/><path d="m15 5 4 4" /></svg
						>
						<span class="visually-hidden">Edit project</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.cards__list {
		--auto-grid-gap: var(--space-m);
	}

	.card {
		background-color: var(--color-surface-mid);
		padding: var(--space-s);
		border: solid 3px var(--color-surface-text-interact);
		border-radius: var(--radius-m);
		overflow: hidden;
	}

	.card__meta {
		--flow-space: var(--space-3xs);
		font-size: var(--text-size-lede);
	}

	.card__meta--label {
		padding: 0.25em 0.4em;

		display: inline-block;
		border-radius: var(--radius-m);
		background-color: orange;
	}
	.card__title {
		font-size: var(--text-size-meta);
		font-weight: var(--font-medium);
		color: var(--color-surface-text-interact);
	}
	.card__cover {
		aspect-ratio: 1.5;
		/* width: 100%; */
		/* height: 12ch; */
		object-fit: cover;
		border-radius: calc(var(--radius-m) / 1.5);
	}

	.button__edit {
		--button-bg: var(--color-surface-bg);

		display: grid;
		place-content: center;
		width: 100%;
	}
</style>
