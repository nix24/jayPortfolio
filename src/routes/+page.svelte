<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
</script>

<main class="flex h-screen flex-col items-center justify-center overflow-hidden">
	<Hero />

	<!-- 2 buttons that link to the about and portfolio pages -->
	<div class="flex flex-row items-center justify-center space-x-4">
		<Button class="hover:animate-pulse" href="/about" variant="outline" size="lg">About</Button>
		<Button class="hover:animate-pulse" href="/portfolio" variant="outline" size="lg"
			>Portfolio</Button
		>
	</div>
</main>

<style>
</style>
