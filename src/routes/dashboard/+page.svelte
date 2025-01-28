<script>
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<h1>Protected data...</h1>

<pre>{JSON.stringify(data, null, 4)}</pre>

<form method="POST" use:enhance>
	<button>Sign out</button>
</form>
