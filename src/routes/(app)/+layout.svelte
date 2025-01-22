<script>
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<header>
	<h1>Lorem ipsum dolor</h1>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit voluptas
		magni quos quo esse nam quisquam, commodi dolore velit unde temporibus error
		ratione optio beatae vitae? Eum esse tenetur distinctio?
	</p>
</header>

{@render children()}
