<script lang="ts">
	import Badge from '$lib/components/Ui/Badge.svelte';
	import Button from '$lib/components/Ui/Button.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { Edit, PackagePlusIcon } from 'lucide-svelte';

	const { data } = $props();
	const projects = $derived(data.projects);
</script>

<div class="flow">
	<div class="repel">
		<h2 class="title">Projects</h2>
		<Button as="a" href="/dashboard/projects/new" variant="outline">
			<PackagePlusIcon aria-hidden="true" /> New project
		</Button>
	</div>
	<hr />

	<ul role="list" class="auto-grid cards-list">
		{#each projects as p}
			<li class="card">
				<img src={p.coverImage?.url} alt="" class="card-image" />
				<div class="flow card-meta">
					<div class="card-title">
						<a href="projects/{p.slug}">{p.title}</a>
					</div>
					<Badge
						label={p.isFeatured ? 'Active' : 'Disabled'}
						isActive={p.isFeatured}
					/>
					<div>
						<ul role="list">
							<li>
								Created: {formatDate(p.createdAt)}
							</li>
							<li>
								Last updated: {formatDate(p.updatedAt)}
							</li>
						</ul>
					</div>
					<div class="">
						<Button
							as="a"
							href="projects/{p.slug}/edit"
							variant="secondary"
							size="medium"
						>
							<Edit aria-hidden="true" />
							<span class="">Edit</span>
						</Button>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.cards-list {
		--auto-grid-gap: var(--space-l);
		--auto-grid-min-size: 20rem;
	}

	.card {
		background: var(--color-global-bg);
		border-radius: var(--radius-m);
		overflow: hidden;
		height: 100%;
	}

	.card-title {
		font-size: var(--text-size-base);
		color: var(--color-global-text);
	}

	.card-title a {
		text-decoration: none;
	}

	.card-meta {
		font-size: var(--text-size-meta);
		padding: var(--space-s);
		color: var(--color-surface-text-interact);
	}

	.card-image {
		aspect-ratio: 16/9;
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
