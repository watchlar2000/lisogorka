<script lang="ts">
	import { page } from '$app/state';
	import { ROUTE } from '$lib/config';
	import { PAGE } from '$lib/constants';
	import { capitalizeFirstLetter } from '$lib/utils/capitalizeFirstLetter';
	import Logo from './Logo.svelte';
	import Button from './Ui/Button.svelte';

	const routes = Object.entries(ROUTE).map(([title, href]) => ({
		title: capitalizeFirstLetter(title),
		href,
	}));

	const isCurrentPage = (path: string) =>
		page.url.pathname === path ? PAGE : undefined;
</script>

<footer class="footer">
	<div class="wrapper flow">
		<div class="repel">
			<div class="footer-logo">
				<Logo size="small" />
			</div>
			<div class="flow">
				<div class="flow socials">
					<span>Let's connect</span>
					<div>
						<ul role="list">
							<li>
								<ul role="list" class="cluster socials-list">
									<li>
										<Button
											as="a"
											href="https://www.instagram.com/iryna_lisogor/"
											size="x-small"
										>
											<svg
												aria-hidden="true"
												width="32"
												height="32"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<rect
													width="20"
													height="20"
													x="2"
													y="2"
													rx="5"
													ry="5"
												/>
												<path
													d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
												/>
												<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
											</svg>
											<span class="visually-hidden">Instagram page link</span>
										</Button>
									</li>
									<li>
										<Button
											as="a"
											href="https://www.linkedin.com/in/iryna-lisogor-72975316a/"
											size="x-small"
										>
											<svg
												aria-hidden="true"
												width="32"
												height="32"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<rect
													width="20"
													height="20"
													x="2"
													y="2"
													rx="5"
													ry="5"
												/>
												<text
													x="6.5"
													y="17"
													font-weight="normal"
													font-size="14"
													fill="currentColor"
												>
													in
												</text>
											</svg>
											<span class="visually-hidden">Linkedin page link</span>
										</Button>
									</li>
									<li>
										<Button
											as="a"
											href="mailto:email@iryna.lisogor.artwrk@gmail.com"
											size="x-small"
										>
											<svg
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="32"
												height="32"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<rect width="20" height="16" x="2" y="4" rx="2" />
												<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
											</svg>
											<span class="visually-hidden">
												Send me an email to iryna.lisogor.artwrk@gmail.com
											</span>
										</Button>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<nav aria-label="Secondary Footer Navigation">
					<ul role="list" class="cluster footer-nav">
						{#each routes as route (route.title)}
							<li>
								<Button
									as="a"
									href={route.href}
									size="x-small"
									variant="ghost"
									aria-current={isCurrentPage(route.href)}
								>
									{route.title}
								</Button>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>
	<div class="footer-copy">
		<div class="wrapper">
			<p>All artistic content Copyright &#169;</p>
			<p>{new Date().getFullYear()} Iryna Lisogor, All rights</p>
		</div>
	</div>
</footer>

<style>
	.footer > .wrapper {
		padding-inline: var(--gutter);
		padding-block: var(--space-l);
	}
	.footer {
		--flow-space: var(--space-m);

		font-size: var(--text-size-lede);
		margin-top: var(--space-l-3xl);
		background-color: var(--color-dark);
		color: var(--color-light-tint);
	}

	.footer-nav {
		--cluster-direction: column;
		--gutter: var(--space-2xs);
		--cluster-vertical-alignment: flex-start;
	}

	:global(.footer-nav a) {
		--_opacity: var(--opacity-default);

		font-weight: var(--font-regular);
		color: rgba(var(--color-light-rgb), var(--_opacity));
		text-decoration: none;
	}

	:global(.footer-nav a:hover) {
		--_opacity: var(--opacity-hover);
	}

	:global(.footer-nav a:focus) {
		--_opacity: var(--opacity-focus);
	}

	:global(.footer-nav a:active) {
		--_opacity: var(--opacity-active);
	}

	.repel {
		--repel-vertical-alignment: flex-start;
	}

	.footer-copy {
		padding-block: var(--space-s);
		font-weight: var(--font-light);
		background-color: rgb(25, 25, 25);
		box-shadow: var(--shadow-xl);
	}

	.footer-logo {
		padding-block: 0.5rem;
	}

	.socials {
		--flow-space: var(--space-2xs);
	}

	.socials span {
		font-size: var(--text-size-meta);
		font-family: var(--font-display);
		font-weight: var(--font-bold);
	}

	.socials-list {
		--cluster-direction: row;
		--gutter: var(--space-m);
	}

	:global(.socials-list li a) {
		--button-bg: ;
	}
</style>
