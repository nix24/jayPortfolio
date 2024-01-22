<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import About from '$lib/components/About.svelte';
	import { onMount } from 'svelte';

	onNavigate((navigation) => {
		// Add type assertion to let TypeScript know that `document` has the `startViewTransition` property
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Jaylon Carrington Portfolio</title>
	<meta
		name="description"
		content="I am a student software engineering major with a strong passion to create stunning projects!"
	/>
	<meta
		name="keywords"
		content="technology, student, college, uncc, software development, portfolio, projects, web development, Jaylon Carrington"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!-- icon -->
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<ModeWatcher />
<NavBar />
<slot />

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
