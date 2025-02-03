<script>
	const { data } = $props();
	const project = $derived(data.project);
</script>

<article class="flow">
	<div class="flow prose article__content">
		<h2>{project.title}</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
			facilis praesentium ratione eum nisi vero quasi id beatae in vel suscipit
			magni minima, assumenda quis magnam eos, ipsum aperiam laborum obcaecati
			maxime, ipsa fuga minus.
		</p>
	</div>

	<div>
		<ul role="list" class="flow images__list">
			{#each project.images as image}
				<li>
					<img src={image.url} alt={image.alt} />
				</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.images__list {
		display: grid;
	}

	.images__list li {
		margin-inline: auto;
	}

	.article__content {
		--wrapper-max-width: 50ch;
	}

	.prose {
		display: grid;
		place-content: center;
	}
</style>
