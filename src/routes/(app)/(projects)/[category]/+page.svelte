<script>
	const { data } = $props();
	const projects = $derived(data.projects);
</script>

{#if !projects.length}
	<p>No projects...</p>
{:else}
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
{/if}

<style>
	.projects__list {
		--auto-grid-min-size: clamp(25rem, 30vw, 30%);
		--auto-grid-gap: var(--gutter);

		width: 100%;
	}

	.projects__list img {
		object-fit: cover;
		width: 100%;
		height: 18ch;
	}
</style>
