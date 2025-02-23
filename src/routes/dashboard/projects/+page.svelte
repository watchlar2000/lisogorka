<script lang="ts">
	import Button from '$lib/components/Ui/Button.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { Edit, PackagePlusIcon } from 'lucide-svelte';

	const { data } = $props();

	const projects = $derived(data.projects);
</script>

<div class="flow">
	<div class="repel">
		<h6 class="title">Projects</h6>
		<Button as="a" href="/dashboard/projects/new" variant="primary">
			<PackagePlusIcon aria-hidden="true" /> New project
		</Button>
	</div>
	<hr />
	<div>
		<ul role="list" class="auto-grid cards__list">
			{#each projects as p}
				<li class="card repel">
					<div class="card__meta flow">
						<img src={p.coverImage?.url} alt="" class="card__cover" />
						<p class="card__title">
							<a href="projects/{p.slug}">{p.title}</a>
						</p>
						<p class="card__meta--label">
							{p.isFeatured ? 'Active' : 'Disabled'}
						</p>
						<p class="card__meta--updated">
							Last update: {formatDate(p.createdAt)}
						</p>
					</div>
					<div class="card__controls cluster">
						<Button as="a" href="projects/{p.slug}/edit" variant="secondary">
							<Edit aria-hidden="true" /> Edit project
						</Button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.cards__list {
		--auto-grid-gap: var(--space-m);
		--auto-grid-min-size: 20ch;
	}

	.card {
		--repel-vertical-alignment: space-between;
		--gutter: var(--space-m);

		background: var(--color-global-bg);
		padding: var(--space-s);
		border-radius: var(--radius-m);
		overflow: hidden;
		height: 100%;
	}

	.card__meta {
		--flow-space: var(--space-3xs);
		font-size: var(--text-size-lede);
	}

	.card__meta--label {
		padding: 0.25em 0.8em;

		display: inline-block;
		border-radius: var(--radius-m);
		background-color: orange;
	}

	.card__meta--updated {
		color: var(--color-surface-text-interact);
	}

	.card__title a {
		font-size: var(--text-size-base);
		text-decoration: none;
	}

	.card__cover {
		aspect-ratio: 1.5;
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: calc(var(--radius-m) / 1.5);
	}

	.card__controls {
		margin-top: auto;
		justify-self: flex-end;
	}
</style>
