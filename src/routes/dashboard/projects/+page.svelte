<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';

	const { data } = $props();

	const projects = $derived(data.projects);
</script>

<!-- <CldUploadWidget
	uploadPreset="lisogorka"
	let:open
	let:isLoading
	onSuccess={(data) => console.log(data)}
	options={{
		showAdvancedOptions: false,
		uploadPreset: 'lisogorka',
		cropping: false,
		multiple: false,
		showCompletedButton: false,
		sources: ['local'],
		defaultSource: 'local',
		styles: {
			palette: {
				window: '#ffffff',
				sourceBg: '#f4f4f5',
				windowBorder: '#90a0b3',
				tabIcon: '#000000',
				inactiveTabIcon: '#555a5f',
				menuIcons: '#555a5f',
				link: '#0433ff',
				action: '#339933',
				inProgress: '#0433ff',
				complete: '#339933',
				error: '#cc0000',
				textDark: '#000000',
				textLight: '#fcfffd',
			},
			fonts: {
				default: null,
				'sans-serif': {
					url: null,
					active: true,
				},
			},
		},
	}}
>
	<button on:click={() => open()} disabled={isLoading}>
		Open the widget
	</button>
</CldUploadWidget>

<CldImage
	src="https://res.cloudinary.com/dezfqozcv/image/upload/v1713639479/cld-sample-5.jpg"
	alt="Turtle"
	width={960}
	height={600}
/> -->

<div class="flow">
	<div class="repel">
		<h6 class="title"><span>🏗️</span> Projects</h6>
		<a href="/dashboard/projects/new" class="button">+ New project</a>
	</div>
	<hr />
	<div>
		<ul role="list" class="auto-grid cards__list">
			{#each projects as p}
				<li class="card flow">
					<!-- <div class="cluster"> -->
					<div class="prose card__meta flow">
						<img src={p.coverImage?.url} alt="" class="card__cover" />
						<p class="card__title"><a href="projects/{p.slug}">{p.title}</a></p>
						<p>{formatDate(p.createdAt)}</p>
						<p class="card__meta--label">
							{p.isFeatured ? 'active' : 'disabled'}
						</p>
					</div>
					<a href="projects/{p.slug}/edit"
						><svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-pencil"
							><path
								d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
							/><path d="m15 5 4 4" /></svg
						>
						<span class="">Edit</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.cards__list {
		--auto-grid-gap: var(--space-m);
	}

	.card {
		background-color: var(--color-surface-mid);
		padding: var(--space-s);
		border: solid 3px var(--color-surface-text-interact);
		border-radius: var(--radius-m);
		overflow: hidden;
	}

	.card__meta {
		--flow-space: var(--space-3xs);
		font-size: var(--text-size-lede);
	}

	.card__meta--label {
		padding: 0.25em 0.4em;

		display: inline-block;
		border-radius: var(--radius-m);
		background-color: orange;
	}
	.card__title {
		font-size: var(--text-size-meta);
		font-weight: var(--font-medium);
		color: var(--color-surface-text-interact);
	}
	.card__cover {
		aspect-ratio: 1.5;
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: calc(var(--radius-m) / 1.5);
	}

	/* .button__edit {
		--cluster-horizontal-alignment: center;
		--gutter: var(--space-2xs);
		--button-bg: var(--color-surface-text-interact);

		width: 100%;
		font-size: var(--text-size-lede);
	} */
</style>
