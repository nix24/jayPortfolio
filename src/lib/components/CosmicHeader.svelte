<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	let darkMode = $state(true);

	// Initialize theme with effect to fix Svelte 5 runes issue
	$effect(() => {
		if (browser) {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme) {
				darkMode = savedTheme === 'light' ? false : true;
			}
			document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
		}
	});

	function toggleTheme() {
		darkMode = !darkMode;
		if (browser) {
			document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
			localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		}
	}

	// Helper to check if current route is active
	function isActiveRoute(route: string): boolean {
		if (route === '/' && page.route.id === '/') return true;
		if (route !== '/' && page.route.id?.startsWith(route)) return true;
		return false;
	}
</script>

<!-- Optimized Header with Tailwind Classes -->
<header
	class="fixed top-0 right-0 left-0 z-50 border-b border-purple-500/20 bg-slate-900/90 backdrop-blur-lg"
>
	<nav
		class="mx-auto flex max-w-6xl flex-col items-center gap-2 p-2 md:flex-row md:justify-between md:gap-0 md:px-6 md:py-4"
	>
		<!-- Logo -->
		<div class="nav-start">
			<a
				href="/"
				class="block rounded-lg transition-transform duration-300 hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
				aria-label="Go to home page"
			>
				<img
					src="/jjLogo.svg"
					alt="JC Logo"
					class="h-8 w-8 brightness-0 drop-shadow-lg invert md:h-10 md:w-10"
					style="filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5)) brightness(0) invert(1);"
				/>
			</a>
		</div>

		<!-- Navigation Links -->
		<div class="flex items-center gap-2 md:gap-4">
			<!-- About Link -->
			<a
				href="/about"
				class="nav-link {isActiveRoute('/about') ? 'active' : ''}"
				data-sveltekit-preload-data="hover"
			>
				About
			</a>

			<!-- Portfolio Link -->
			<a
				href="/portfolio"
				class="nav-link {isActiveRoute('/portfolio') ? 'active' : ''}"
				data-sveltekit-preload-data="hover"
			>
				Portfolio
			</a>
		</div>
	</nav>
</header>

<style>
	/* Custom styles for nav links - optimized for Tailwind CSS v4 */
	.nav-link {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		font-size: 0.875rem;
		/* Use GPU acceleration for hover effects */
		will-change: transform, background-color, color;
		transform: translateZ(0);
	}

	.nav-link:hover {
		color: rgb(196 181 253);
		background-color: rgba(168, 85, 247, 0.1);
	}

	.nav-link:focus {
		outline: none;
		box-shadow:
			0 0 0 2px rgb(168 85 247),
			0 0 0 4px rgba(15, 15, 35, 1);
	}

	.nav-link.active {
		color: rgb(196 181 253);
		background-color: rgba(168, 85, 247, 0.1);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 50%;
		height: 2px;
		background-color: rgb(196 181 253);
		border-radius: 9999px;
		transform: translateX(-50%);
	}

	/* Responsive styles */
	@media (min-width: 768px) {
		.nav-link {
			padding: 0.5rem 1rem;
			font-size: 1rem;
		}
	}
</style>
