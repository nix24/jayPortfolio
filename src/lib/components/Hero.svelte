<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { Github, Linkedin, Instagram, AtSign } from 'lucide-svelte';

	let animate = false;

	onMount(() => {
		animate = true;
	});
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
		<img
			class="h-52 w-52 rounded-full"
			src="src/lib/static/guy_placeholder.webp"
			alt="guy_placeholder"
			in:fly={{ x: -100, delay: 500, duration: 1000 }}
		/>
		<p
			class="gradient-text text-4xl font-bold"
			in:scale={{ start: 0.5, delay: 700, duration: 500 }}
		>
			Jaylon Carrington
		</p>
		<!-- a clean list of icons showing socials -->
		<div class="social-icons mt-5 flex flex-row items-center justify-center space-x-4">
			{#each [Github, Linkedin, Instagram, AtSign] as Icon, i (i)}
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					class="transition hover:scale-125 hover:text-purple-500"
					in:fade={{ delay: 800 + i * 100, duration: 500 }}
				>
					<Icon />
				</a>
			{/each}
		</div>
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
</style>
