<script>
	import profileImage from '$lib/assets/iryna.webp';
	import Seo from '$lib/components/SEO.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<Seo
	title="About Page | Iryna Lisogor"
	description="Learn more about Iryna Lisogor, an illustrator, passionate about vibrant artworks."
/>
<div class="prose flow">
	<img
		src={profileImage}
		alt="Iryna Lisogor, illustrator and author of the content of this website"
		class="avatar"
		loading="lazy"
		decoding="async"
		in:fade={{ duration: 250, easing: cubicOut }}
	/>
	<h1 class="visually-hidden">
		Welcome to my About page, where I share a bit about myself and the things in
		life that I admire.
	</h1>
	<h2>Hi!</h2>
	<p>
		I'm Ira, an illustrator based in Kyiv, Ukraine, with a passion for creating
		and storytelling. I enjoy diving headfirst into projects, exploring, and
		creating vibrant artworks which tell stories and spark joy. Previously
		worked in various fields like editorial, advertising, and social media.
	</p>
	<p>
		Aside from work, I love having fun with my dog, reading books, hiking and
		exploring new things.
	</p>
	<p>
		You can reach out to me via
		<a href="mailto:iryna.lisogor.artwrk@gmail.com">
			iryna.lisogor.artwrk@gmail.com
		</a>
		. Resume available upon request.
	</p>
</div>

<style>
	.avatar {
		object-fit: cover;
		height: 20ch;
		width: 20ch;
		border-radius: 50%;
		margin-inline: auto;
	}
</style>
