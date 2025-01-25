<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<!-- <pre>
  {JSON.stringify(data.projects, null, 4)}
</pre> -->

<ul role="list" class="auto-grid projects__list">
	{#each data.projects as p}
		<li>
			<h2>{p.title}</h2>
		</li>
	{/each}
</ul>

<style>
	.projects__list {
		/* --grid-min-item-size: clamp(25rem, 30vw, 30%); */
		--auto-grid-min-size: clamp(25rem, 30vw, 30%);
		--auto-grid-gap: var(--gutter);

		width: 100%;
	}
	.projects__list li {
		background-color: orange;
		padding: var(--gutter);
	}
</style>
