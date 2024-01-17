<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { toggleMode, mode } from 'mode-watcher';
	import { onMount } from 'svelte';

	// Reactive statement to return t or f based on current mode
	let isDarkMode: boolean;
	let hasScrolled: boolean;
	$: isDarkMode = $mode === 'dark';

	//on mount to check scroll position
	onMount(() => {
		window.addEventListener('scroll', () => {
			hasScrolled = window.scrollY > 100;
		});
	});
</script>

<nav
	class=" sticky top-0 z-10 flex items-center justify-between px-4 py-2 transition ease-in-out
	{hasScrolled && isDarkMode
		? 'darkModeBg border-b-2 bg-black'
		: hasScrolled && !isDarkMode
			? 'lightModeBg border-b-2 bg-white'
			: 'defaultBg'}
	"
>
	<!-- logo -->
	<a href="/" class="flex items-center justify-center">
		<span class="ml-2 text-xl font-bold">Jaylon Carrington</span>
	</a>
	<Button on:click={toggleMode} variant="outline" size="icon">
		{#if isDarkMode}
			<Moon
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-white transition-all dark:rotate-0 dark:scale-100"
			/>
		{:else}
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
		{/if}
		<span class="sr-only">Toggle theme</span>
	</Button>

	<!-- links for portfolio, about, and goals list  -->
	<div class="flex flex-row items-center justify-center space-x-4">
		<a class="hover:animate-pulse" href="/about">About</a>
		<a class="hover:animate-pulse" href="/portfolio"> Portfolio </a>
	</div>
</nav>

<style>
	.darkModeBg {
		border-bottom-color: #ffff;
	}

	.lightModeBg {
		border-bottom-color: #000000;
	}
</style>
