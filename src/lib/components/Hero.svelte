<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { Github, Linkedin, Instagram, AtSign } from 'lucide-svelte';
	import guy from '$lib/static/guy_placeholder.webp';
	import { mode } from 'mode-watcher';

	$: isDarkMode = $mode === 'dark';
	let animate = false;

	onMount(() => {
		animate = true;
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			isDarkMode = true;
		}
	});

	let links = [
		{
			link: 'https://github.com/nix24?tab=repositories',
			icon: Github
		},

		{
			link: 'https://www.linkedin.com/in/jaylon-carrington-07b924211/',
			icon: Linkedin
		},
		{
			link: 'https://www.instagram.com/jay_pheonix/',
			icon: Instagram
		},
		{
			//email link
			link: 'mailto:carringtonjaylon4@gmail.com',
			icon: AtSign
		}
	];
</script>

{#if animate}
	<div class="container m-4 flex flex-col items-center justify-center">
		<div
			class="mb-5 flex flex-col items-center justify-center"
			in:fade={{ delay: 300, duration: 1500 }}
		>
			<h1 class="text-center text-xl">
				A developer that wants to share his passions with the world
			</h1>
		</div>
		<img class="h-48 w-48 rounded-full" src={guy} alt="guy" />
	</div>
	<p class="gradient-text text-4xl font-bold" in:scale={{ start: 0.5, delay: 700, duration: 500 }}>
		Jaylon Carrington
	</p>
	<!-- a clean list of icons showing socials -->
	<div class="social-icons mt-5 flex flex-row items-center justify-center space-x-4">
		{#each links as { link, icon }, i (i)}
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				class=" my-4 transition hover:scale-125 hover:text-purple-500"
			>
				<svelte:component this={icon} />
			</a>
		{/each}
	</div>
{/if}

<style>
	.container {
		perspective: 1000px;
	}
	.social-icons a {
		display: inline-block;
		transform-origin: center bottom;
	}
	.gradient-text {
		background: linear-gradient(45deg, purple, red);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		/* animation */
	}
	.dark .invert {
		filter: invert(1);
	}
</style>
