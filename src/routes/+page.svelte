<script lang="ts">
	// No imports needed - using pure HTML links for optimal performance
</script>

<!-- Cosmic Container -->
<main class="cosmic-container">
	<!-- Cosmic Background -->
	<div class="cosmic-background">
		<!-- Nebula Layers -->
		<div class="nebula-layer nebula-purple"></div>
		<div class="nebula-layer nebula-pink"></div>
		<div class="nebula-layer nebula-blue"></div>

		<div class="stars-layer">
			{#each Array.from({ length: 50 }, (_, i) => i) as i}
				<div
					class="cosmic-star star-{(i % 3) + 1}"
					style="--delay: {Math.random() * 3}s; --x: {Math.random() * 100}%; --y: {Math.random() *
						100}%;"
				></div>
			{/each}
		</div>
	</div>

	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<!-- Cosmic Tagline -->
			<h1 class="cosmic-tagline">A developer that wants to share his passions with the world</h1>

			<!-- Profile Planet -->
			<div class="profile-planet">
				<div class="orbital-ring"></div>
				<img src="/jaySelfie1.webp" alt="Jaylon Carrington" class="profile-image" />
				<div class="planetary-glow"></div>
			</div>

			<!-- Cosmic Name -->
			<h2 class="cosmic-name">Jaylon Carrington</h2>

			<!-- Social Media -->
			<div class="social-section">
				<div class="social-constellation">
					<a
						href="https://github.com/nix24"
						class="celestial-body"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src="/github.svg" alt="GitHub" class="social-icon" />
					</a>
					<a
						href="https://www.linkedin.com/in/jaylon-carrington-07b924211/"
						class="celestial-body"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</a>
					<a
						href="https://www.instagram.com/jay_pheonix/"
						class="celestial-body"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Buttons -->
			<div class="cta-section">
				<a
					href="/about"
					class="cosmic-button primary"
					data-sveltekit-preload-data="hover"
					rel="prefetch"
				>
					About
				</a>
				<a
					href="/portfolio"
					class="cosmic-button secondary"
					data-sveltekit-preload-data="hover"
					rel="prefetch"
				>
					Portfolio
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	/* Base Variables */
	:global(:root) {
		--cosmic-purple: #a855f7;
		--cosmic-pink: #ec4899;
		--cosmic-blue: #3b82f6;
		--cosmic-amber: #f59e0b;
	}

	/* Container - Mobile First */
	.cosmic-container {
		background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
		position: relative;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		min-height: 100vh;
		color: white;
		overflow-x: hidden;
		padding: 1rem;
	}

	/* Background */
	.cosmic-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.nebula-layer {
		position: absolute;
		width: 150%;
		height: 150%;
		border-radius: 50%;
		filter: blur(50px);
		opacity: 0.3;
		animation: cosmic-float 30s ease-in-out infinite;
	}

	.nebula-purple {
		background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
		top: -20%;
		left: -20%;
		animation-delay: 0s;
	}

	.nebula-pink {
		background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
		top: 40%;
		right: -30%;
		animation-delay: -10s;
	}

	.nebula-blue {
		background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
		bottom: -20%;
		left: 10%;
		animation-delay: -20s;
	}

	.stars-layer {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.cosmic-star {
		position: absolute;
		background: white;
		border-radius: 50%;
		animation: cosmic-twinkle 3s ease-in-out infinite;
		animation-delay: var(--delay);
		left: var(--x);
		top: var(--y);
	}

	.star-1 {
		width: 1.5px;
		height: 1.5px;
		box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
	}

	.star-2 {
		width: 1px;
		height: 1px;
		box-shadow: 0 0 3px var(--cosmic-purple);
	}

	.star-3 {
		width: 1.2px;
		height: 1.2px;
		box-shadow: 0 0 3px var(--cosmic-pink);
	}

	/* Hero Section - Mobile First */
	.hero-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 10;
		padding: 4rem 1rem 2rem;
	}

	.hero-content {
		max-width: 100%;
		width: 100%;
		text-align: center;
		position: relative;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.cosmic-tagline {
		font-size: 1.5rem;
		font-weight: 300;
		color: #ffffff;
		letter-spacing: 0.5px;
		line-height: 1.4;
		margin-bottom: 0;
		text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
		position: relative;
		z-index: 60;
		max-width: 90%;
		white-space: normal;
	}

	.profile-planet {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 60;
	}

	.orbital-ring {
		position: absolute;
		width: 160px;
		height: 160px;
		border: 2px solid rgba(168, 85, 247, 0.3);
		border-radius: 50%;
		animation: cosmic-orbit 20s linear infinite;
	}

	.orbital-ring::before {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		background: var(--cosmic-purple);
		border-radius: 50%;
		top: -3px;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 10px var(--cosmic-purple);
	}

	.profile-image {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid rgba(255, 255, 255, 0.2);
		position: relative;
		z-index: 65;
	}

	.planetary-glow {
		position: absolute;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
		animation: cosmic-glow-pulse 4s ease-in-out infinite;
		z-index: 61;
	}

	.cosmic-name {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(
			45deg,
			var(--cosmic-purple),
			var(--cosmic-pink),
			var(--cosmic-amber),
			var(--cosmic-blue)
		);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: #ffffff;
		animation: cosmic-gradient-shift 8s ease-in-out infinite;
		letter-spacing: 2px;
		position: relative;
		z-index: 60;
	}

	.social-section {
		position: relative;
		z-index: 60;
	}

	.social-constellation {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.celestial-body {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
		text-decoration: none;
		position: relative;
		z-index: 65;
	}

	.celestial-body:hover {
		background: rgba(168, 85, 247, 0.2);
		border-color: rgba(168, 85, 247, 0.5);
		box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
		transform: scale(1.1);
	}

	.social-icon {
		width: 20px;
		height: 20px;
		color: rgba(255, 255, 255, 0.8);
		transition: color 0.3s ease;
	}

	.celestial-body:hover .social-icon {
		color: #ffffff;
	}

	.cta-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		position: relative;
		z-index: 60;
	}

	.cosmic-button {
		padding: 10px 24px;
		font-size: 1rem;
		font-weight: 600;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
		position: relative;
		overflow: hidden;
		z-index: 65;
		width: 100%;
		max-width: 250px;
	}

	.cosmic-button.primary {
		background: linear-gradient(45deg, var(--cosmic-purple), var(--cosmic-pink));
		color: white;
		box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
	}

	.cosmic-button.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(168, 85, 247, 0.5);
	}

	.cosmic-button.secondary {
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.cosmic-button.secondary:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(255, 255, 255, 0.2);
	}

	/* Animations */
	@keyframes cosmic-float {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(20px, -20px) rotate(120deg);
		}
		66% {
			transform: translate(-15px, 15px) rotate(240deg);
		}
	}

	@keyframes cosmic-twinkle {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	@keyframes cosmic-orbit {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes cosmic-glow-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.7;
		}
	}

	@keyframes cosmic-gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	/* Desktop Adjustments */
	@media (min-width: 768px) {
		.cosmic-container {
			padding: 0;
		}

		.cosmic-header {
			padding: 1rem 1.5rem;
		}

		.cosmic-nav {
			flex-direction: row;
			justify-content: space-between;
			gap: 0;
			max-width: 1200px;
			margin: 0 auto;
		}

		.nav-start,
		.nav-end {
			width: auto;
			justify-content: flex-start;
		}

		.nav-items {
			gap: 1rem;
			flex-wrap: nowrap;
		}

		.logo-icon {
			width: 40px;
			height: 40px;
		}

		.cosmic-nav-link {
			padding: 0.5rem 1rem;
			font-size: 1rem;
		}

		.theme-toggle {
			width: 40px;
			height: 40px;
			font-size: 18px;
		}

		.hero-section {
			padding: 5rem 1.5rem 2rem;
		}

		.hero-content {
			max-width: 800px;
			gap: 2rem;
		}

		.cosmic-tagline {
			font-size: clamp(1.8rem, 4vw, 2.5rem);
			max-width: 600px;
			margin: 0 auto 2rem;
		}

		.profile-planet {
			margin-bottom: 1rem;
		}

		.orbital-ring {
			width: 200px;
			height: 200px;
		}

		.profile-image {
			width: 150px;
			height: 150px;
		}

		.planetary-glow {
			width: 180px;
			height: 180px;
		}

		.cosmic-name {
			font-size: clamp(3rem, 6vw, 4rem);
			margin-bottom: 1.5rem;
		}

		.social-section {
			margin-bottom: 2rem;
		}

		.social-constellation {
			gap: 1.5rem;
		}

		.celestial-body {
			width: 50px;
			height: 50px;
		}

		.social-icon {
			width: 24px;
			height: 24px;
		}

		.cta-section {
			flex-direction: row;
			gap: 1.5rem;
			width: auto;
		}

		.cosmic-button {
			padding: 12px 32px;
			font-size: 1.1rem;
			width: auto;
			max-width: none;
		}

		.nebula-layer {
			width: 120%;
			height: 120%;
			filter: blur(100px);
		}

		.nebula-purple {
			top: -10%;
			left: -10%;
		}

		.nebula-pink {
			top: 30%;
			right: -20%;
		}

		.nebula-blue {
			bottom: -10%;
			left: 20%;
		}

		.star-1 {
			width: 2px;
			height: 2px;
			box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
		}

		.star-2 {
			width: 1px;
			height: 1px;
			box-shadow: 0 0 6px var(--cosmic-purple);
		}

		.star-3 {
			width: 1.5px;
			height: 1.5px;
			box-shadow: 0 0 6px var(--cosmic-pink);
		}

		@keyframes cosmic-float {
			0%,
			100% {
				transform: translate(0, 0) rotate(0deg);
			}
			33% {
				transform: translate(30px, -30px) rotate(120deg);
			}
			66% {
				transform: translate(-20px, 20px) rotate(240deg);
			}
		}

		@keyframes cosmic-twinkle {
			0%,
			100% {
				opacity: 0.3;
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.2);
			}
		}

		@keyframes cosmic-glow-pulse {
			0%,
			100% {
				transform: scale(1);
				opacity: 0.5;
			}
			50% {
				transform: scale(1.1);
				opacity: 0.8;
			}
		}
	}
</style>
