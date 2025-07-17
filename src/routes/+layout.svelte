<script>
	import '../app.css';
	import '../lib/styles/cosmic.css';
	import CosmicHeader from '../lib/components/CosmicHeader.svelte';
	import { navigating, page } from '$app/state';
	import { fly } from 'svelte/transition';

	// Optimized transition parameters for performance
	const transitionParams = {
		duration: 300,
		x: 20,
		opacity: 0
	};
</script>

<!-- SEO and Performance -->
<svelte:head>
	<title>Jay Carrington - Full Stack Developer</title>
	<meta
		name="description"
		content="Jay Carrington's portfolio - Full Stack Developer specializing in backend technologies, Python, JavaScript, and modern web frameworks."
	/>
	<meta
		name="keywords"
		content="Jay Carrington, Full Stack Developer, Backend Developer, Python, JavaScript, TypeScript, React, Svelte, Portfolio"
	/>
	<meta property="og:title" content="Jay Carrington - Full Stack Developer" />
	<meta
		property="og:description"
		content="Full Stack Developer specializing in backend technologies and modern web frameworks"
	/>
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://api.github.com" />
</svelte:head>

<!-- Fixed Header -->
<CosmicHeader />

<!-- Page Transition Container -->
<main class="relative min-h-screen">
	{#if navigating && navigating.to && navigating.to.route.id !== page.route.id}
		<!-- Loading indicator during navigation -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
		>
			<div class="flex flex-col items-center gap-4">
				<div
					class="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"
				></div>
				<p class="text-sm text-white/80">Navigating...</p>
			</div>
		</div>
	{/if}

	<!-- Page Content with Transition -->
	{#key page.route.id}
		<div in:fly={transitionParams} out:fly={{ ...transitionParams, x: -20 }} class="relative z-10">
			<slot />
		</div>
	{/key}
</main>

<style>
	/* Optimize animations for performance */
	:global(*) {
		/* Use GPU acceleration for smooth animations */
		transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	/* Reduce motion for users who prefer it */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Performance optimizations */
	:global(body) {
		/* Improve font rendering */
		text-rendering: optimizeSpeed;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		/* Improve scrolling on mobile */
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-y: contain;
	}

	/* Image optimization */
	:global(img) {
		/* Prevent layout shift */
		height: auto;
		/* Modern image loading handled via HTML attributes */
	}
</style>
