<div class="with-sidebar about__container">
	<div class="sidebar about__meta">
		<enhanced:img src="./about.jpeg" alt="" />
	</div>
	<div class="not-sidebar prose flow about__content">
		<h2>Hi!</h2>
		<p>
			I'm Ira, an illustrator based in Kyiv, Ukraine, with a passion for
			creating and storytelling. I enjoy diving headfirst into projects,
			exploring, and creating vibrant artworks which tell stories and spark joy.
			Previously worked in various fields like editorial, advertising, and
			social media.
		</p>
		<p>
			Aside from work, I love having fun with my dog, reading books, hiking and
			exploring new things.
		</p>
		<p>
			You can reach out to me via <a href="mailto:"
				>iryna.lisogor.artwrk@gmail.com</a
			>. Resume available upon request.
		</p>
	</div>
</div>

<style>
	.about__container {
		container-type: inline-size;
	}

	.about__meta {
		--sidebar-width: 20ch;
		margin-bottom: var(--space-xl);
	}

	.about__content {
		min-width: 55%;
	}

	@container (min-width: 908px) {
		.about__meta {
			order: 2;
		}
	}
</style>
