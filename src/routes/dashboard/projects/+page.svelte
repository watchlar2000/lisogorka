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
		<Button as="a" href="/dashboard/projects/new" variant="outline">
			<PackagePlusIcon aria-hidden="true" /> New project
		</Button>
	</div>
	<hr />
	<div>
		<ul role="list" class="auto-grid cards__list">
			{#each projects as p}
				<li class="card repel">
					<div class="card__meta flow">
						<div class="card__cover">
							<img src={p.coverImage?.url} alt="" />
							<div class="card__controls">
								<Button as="a" href="projects/{p.slug}/edit" variant="primary">
									<Edit aria-hidden="true" />
									<span class="visually-hidden">Edit project</span>
								</Button>
							</div>
						</div>
						<p class="card__title">
							<a href="projects/{p.slug}">{p.title}</a>
						</p>
						<p class="card__meta--label">
							{p.isFeatured ? 'Active' : 'Disabled'}
						</p>
						<div>
							<p class="card__meta--updated">
								Created: {formatDate(p.createdAt)}
							</p>
							<p class="card__meta--updated">
								Last updated: {formatDate(p.updatedAt)}
							</p>
						</div>
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
		position: relative;
	}

	.card__cover img {
		aspect-ratio: 16/9;
		width: 100%;
		height: 25ch;
		object-fit: cover;
		border-radius: calc(var(--radius-m) / 1.5);
	}

	.card__controls {
		position: absolute;
		top: var(--space-2xs);
		left: var(--space-2xs);
	}
</style>
