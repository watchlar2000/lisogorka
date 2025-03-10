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
		<h1>Projects</h1>
		<Button as="a" href="/dashboard/projects/new" variant="outline">
			<PackagePlusIcon aria-hidden="true" /> New project
		</Button>
	</div>
	<hr />
	<div>
		<ul role="list" class="auto-grid cards-list">
			{#each projects as p}
				<li class="card">
					<div class={!p.isFeatured ? 'muted' : ''}>
						<img src={p.coverImage?.url} alt="" class="card-image" />
					</div>
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
</div>

<style>
	.cards-list {
		--auto-grid-min-size: clamp(13rem, 30vw, 30%);
		--auto-grid-gap: var(--gutter);
	}

	.card {
		background: var(--color-light-shade);
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
		--flow-space: var(--space-2xs);

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

	.muted {
		transition: opacity 0.1s ease;
		opacity: 0.25;
	}

	.card:hover .muted {
		opacity: 1;
	}
</style>
