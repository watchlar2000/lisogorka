<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<ul role="list" class="auto-grid projects__list">
	{#each data.projects as p}
		<li>
			<a href="/">
				<img src={p.coverImage?.url} alt="" />
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

	.projects__list img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
