<script lang="ts">
	import type { ProjectWithCoverImage } from '$lib/server/api/projects/projects.types';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const { projects }: { projects: ProjectWithCoverImage[] } = $props();
</script>

<ul role="list" class="auto-grid projects-list">
	{#each projects as p (p.id)}
		<li
			in:fade|global={{
				duration: 250,
				easing: cubicOut,
			}}
		>
			<a href="/{p.category}/{p.slug}">
				<img src={p.coverImage?.url} alt="" aria-hidden="true" />
				<span class="visually-hidden">{p.title}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects-list {
		--auto-grid-min-size: clamp(13rem, 30vw, 30%);
		--auto-grid-gap: var(--gutter);

		min-width: 100%;
	}

	.projects-list li a {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-m);
		overflow: hidden;
	}

	.projects-list img {
		object-fit: cover;
		aspect-ratio: 1.5;
		width: 100%;
		height: auto;
	}
</style>
