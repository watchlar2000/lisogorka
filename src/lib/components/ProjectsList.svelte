<script lang="ts">
	import type { ProjectWithCoverImage } from '$lib/server/api/projects/projects.types';

	const { projects }: { projects: ProjectWithCoverImage[] } = $props();
</script>

<ul role="list" class="auto-grid projects__list">
	{#each projects as p}
		<li>
			<a href="/{p.category}/{p.slug}">
				<img src={p.coverImage?.url} alt="" aria-hidden="true" />
				<span class="visually-hidden">{p.title}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects__list {
		--auto-grid-min-size: clamp(25rem, 30vw, 30%);
		--auto-grid-gap: var(--gutter);

		width: 100%;
	}

	.projects__list li a {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-m);
		overflow: hidden;
	}

	.projects__list img {
		object-fit: cover;
		aspect-ratio: 1.5;
		width: 100%;
		height: auto;
	}
</style>
