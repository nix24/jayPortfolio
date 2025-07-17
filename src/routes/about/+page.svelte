<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Detailed skill descriptions
	const skillDescriptions = {
		Python:
			'Primary backend language with extensive experience in web frameworks, data processing, and automation scripts.',
		Java: 'Strong foundation in object-oriented programming, used for enterprise applications and algorithm implementations.',
		JavaScript:
			'Versatile language for both frontend and backend development with modern ES6+ features.',
		TypeScript: 'Type-safe JavaScript development with experience in large-scale applications.',
		'C++':
			'Systems programming and performance-critical applications with solid understanding of memory management.',
		MongoDB:
			'Primary NoSQL database choice with expertise in document design and aggregation pipelines.',
		MySQL: 'Relational database management with complex query optimization and schema design.',
		PostgreSQL: 'Advanced SQL features and database administration with focus on data integrity.',
		Redis: 'In-memory caching and session storage with basic clustering knowledge.',
		'Node.js': 'Server-side JavaScript runtime for building scalable network applications.',
		'Express.js': 'Lightweight web framework for building RESTful APIs and web services.',
		React: 'Component-based UI development with hooks and state management.',
		Svelte: 'Modern frontend framework with compile-time optimizations.',
		FastAPI:
			'High-performance Python web framework for building APIs with automatic documentation.',
		Git: 'Version control mastery including branching strategies, merge conflicts, and collaborative workflows.',
		Docker: 'Containerization for development and deployment with basic orchestration.',
		AWS: 'Cloud services including EC2, S3, and basic serverless functions.',
		Linux: 'Command-line proficiency and system administration for development environments.',
		'REST APIs': 'Design and implementation of RESTful services with proper HTTP semantics.'
	};

	// Skills with positions for constellation patterns
	const skillConstellations = [
		{
			name: 'Backend Languages',
			color: '#a855f7',
			skills: [
				{ name: 'Python', proficiency: 4, x: 50, y: 20 },
				{ name: 'Java', proficiency: 4, x: 80, y: 40 },
				{ name: 'JavaScript', proficiency: 5, x: 20, y: 60 },
				{ name: 'TypeScript', proficiency: 5, x: 70, y: 80 },
				{ name: 'C++', proficiency: 3, x: 40, y: 90 }
			],
			connections: [
				[0, 1],
				[1, 3],
				[3, 4],
				[4, 2],
				[2, 0]
			]
		},
		{
			name: 'Databases',
			color: '#ec4899',
			skills: [
				{ name: 'MongoDB', proficiency: 4, x: 30, y: 25 },
				{ name: 'MySQL', proficiency: 4, x: 70, y: 30 },
				{ name: 'PostgreSQL', proficiency: 4, x: 50, y: 70 },
				{ name: 'Redis', proficiency: 2, x: 25, y: 85 }
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 0]
			]
		},
		{
			name: 'Frameworks & Libraries',
			color: '#3b82f6',
			skills: [
				{ name: 'Node.js', proficiency: 5, x: 40, y: 15 },
				{ name: 'Express.js', proficiency: 5, x: 75, y: 35 },
				{ name: 'React', proficiency: 4, x: 65, y: 75 },
				{ name: 'Svelte', proficiency: 5, x: 25, y: 65 },
				{ name: 'FastAPI', proficiency: 3, x: 15, y: 30 }
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 0]
			]
		},
		{
			name: 'Tools & Platforms',
			color: '#f59e0b',
			skills: [
				{ name: 'Git', proficiency: 4, x: 50, y: 20 },
				{ name: 'Docker', proficiency: 3, x: 80, y: 50 },
				{ name: 'AWS', proficiency: 2, x: 60, y: 85 },
				{ name: 'Linux', proficiency: 4, x: 20, y: 75 },
				{ name: 'REST APIs', proficiency: 5, x: 30, y: 40 }
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 0]
			]
		}
	];

	let sectionsVisible = $state({
		hero: true,
		skills: true,
		cta: true
	});

	let selectedSkill: any = $state(null);
	let showModal = $state(false);
	let activeConstellation = $state(0);

	onMount(() => {
		sectionsVisible.hero = true;
		sectionsVisible.skills = true;
		sectionsVisible.cta = true;
	});

	function openSkillModal(skill: any, constellation: any) {
		selectedSkill = {
			...skill,
			description: skillDescriptions[skill.name as keyof typeof skillDescriptions],
			constellation: constellation.name,
			color: constellation.color
		};
		showModal = true;

		// Focus the modal when it opens
		setTimeout(() => {
			const modal = document.querySelector('.modal-overlay') as HTMLElement;
			if (modal) modal.focus();
		}, 100);
	}

	function closeModal() {
		showModal = false;
		selectedSkill = null;
	}

	function getProficiencyText(level: number) {
		switch (level) {
			case 5:
				return 'Expert';
			case 4:
				return 'Advanced';
			case 3:
				return 'Proficient';
			case 2:
				return 'Intermediate';
			case 1:
				return 'Beginner';
			default:
				return 'Beginner';
		}
	}

	function getProficiencyColor(level: number) {
		switch (level) {
			case 5:
				return '#f59e0b';
			case 4:
				return '#3b82f6';
			case 3:
				return '#ec4899';
			case 2:
				return '#a855f7';
			case 1:
				return '#6b7280';
			default:
				return '#6b7280';
		}
	}

	// Optimized contact function with better security
	function openEmail() {
		window.open('mailto:jaylon.carrington@gmail.com', '_blank', 'noopener,noreferrer');
	}
</script>

<!-- Cosmic Container -->
<main class="cosmic-container">
	<!-- Cosmic Background -->
	<div class="cosmic-background">
		<!-- Nebula Layers -->
		<div class="nebula-layer nebula-purple"></div>
		<div class="nebula-layer nebula-pink"></div>
		<div class="nebula-layer nebula-blue"></div>

		<div class="stars-layer z-10">
			{#each Array.from({ length: 60 }, (_, i) => i) as i}
				<div
					class="cosmic-star star-{(i % 3) + 1}"
					style="--delay: {Math.random() * 4}s; --x: {Math.random() * 100}%; --y: {Math.random() *
						100}%;"
				></div>
			{/each}
		</div>
	</div>

	<!-- Main Content Sections -->
	<div class="about-content">
		<!-- Hero/Introduction Section -->
		<section class="hero-introduction" class:visible={sectionsVisible.hero}>
			<div class="section-container">
				<h1 class="cosmic-headline">My Journey: A Developer's Story</h1>

				<div class="journey-content">
					<div class="story-card">
						<h2 class="story-question">So who am I anyways?</h2>
						<div class="story-paragraphs">
							<p class="story-paragraph">
								I am a recent graduate from the University of North Carolina at Charlotte, where I
								earned my degree in Computer Science. Throughout my academic journey, I have
								developed a strong passion for software engineering, with a particular focus on
								backend development.
							</p>
							<p class="story-paragraph">
								My coursework and hands-on experience have equipped me with a solid foundation in
								working with and creating HTTP servers, working with noSql and Sql databases and a
								deep understanding of data-structures.
							</p>
							<p class="story-paragraph">
								I have also had the opportunity to work on frontend projects. As I embark on my
								professional career, I am excited to contribute my skills and knowledge to a dynamic
								and innovative software engineering team. I am currently seeking opportunities that
								will allow me to further develop my expertise in backend technologies while
								collaborating to create robust and efficient software solutions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Constellation Section -->
		<section class="skills-constellation" class:visible={sectionsVisible.skills}>
			<div class="section-container">
				<h2 class="cosmic-headline">My Toolset</h2>

				<!-- Constellation Navigation -->
				<div class="constellation-nav">
					{#each skillConstellations as constellation, index}
						<button
							class="constellation-selector"
							class:active={activeConstellation === index}
							style="--constellation-color: {constellation.color}"
							onclick={() => (activeConstellation = index)}
						>
							{constellation.name}
						</button>
					{/each}
				</div>

				<!-- Active Constellation Display -->
				<div class="constellation-viewer">
					{#each skillConstellations as constellation, constellationIndex}
						{#if activeConstellation === constellationIndex}
							<div
								class="constellation-container"
								style="--constellation-color: {constellation.color}"
							>
								<svg class="constellation-svg" viewBox="0 0 100 100">
									<!-- Connection Lines -->
									{#each constellation.connections as connection}
										<line
											x1="{constellation.skills[connection[0]].x}%"
											y1="{constellation.skills[connection[0]].y}%"
											x2="{constellation.skills[connection[1]].x}%"
											y2="{constellation.skills[connection[1]].y}%"
											class="constellation-line"
											style="stroke: {constellation.color}; opacity: 0.4;"
										/>
									{/each}

									<!-- Skill Stars -->
									{#each constellation.skills as skill, skillIndex}
										<g class="star-group" style="--skill-delay: {skillIndex * 0.1}s">
											<circle
												cx="{skill.x}%"
												cy="{skill.y}%"
												r="2.5"
												class="skill-star-bg"
												style="fill: {constellation.color}; opacity: 0.3;"
											/>
											<circle
												cx="{skill.x}%"
												cy="{skill.y}%"
												r="1.5"
												class="skill-star-core"
												style="fill: {getProficiencyColor(skill.proficiency)};"
												onclick={() => openSkillModal(skill, constellation)}
												onkeydown={(e) =>
													(e.key === 'Enter' || e.key === ' ') &&
													openSkillModal(skill, constellation)}
												role="button"
												aria-label="View details for {skill.name}"
												tabindex="0"
											/>
											<!-- Pulsing Rings for High Proficiency -->
											{#if skill.proficiency >= 4}
												<circle
													cx="{skill.x}%"
													cy="{skill.y}%"
													r="3.5"
													class="skill-star-pulse"
													style="stroke: {constellation.color}; fill: none; opacity: 0.6;"
												/>
											{/if}
										</g>
									{/each}
								</svg>

								<!-- Skill Labels -->
								<div class="skill-labels">
									{#each constellation.skills as skill}
										<button
											class="skill-label"
											style="left: {skill.x}%; top: {skill.y}%;"
											onclick={() => openSkillModal(skill, constellation)}
											aria-label="View details for {skill.name}"
										>
											<span class="skill-name">{skill.name}</span>
											<div class="proficiency-dots">
												{#each Array(4) as _, i}
													<div
														class="proficiency-dot"
														class:filled={i < skill.proficiency}
														style="background-color: {i < skill.proficiency
															? getProficiencyColor(skill.proficiency)
															: 'rgba(255,255,255,0.2)'};"
													></div>
												{/each}
											</div>
										</button>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</section>

		<!-- Experience/Projects Snippet -->
		<section class="projects-teaser" class:visible={sectionsVisible.cta}>
			<div class="section-container">
				<h2 class="cosmic-headline">Projects</h2>
				<div class="teaser-content">
					<p class="teaser-text">
						From interactive audio visualizers to sorting algorithm demonstrations, I've channeled
						my learning into practical projects that showcase both technical skills and creative
						problem-solving.
					</p>
					<a href="/portfolio" class="cosmic-button primary" data-sveltekit-preload-data="hover">
						Explore My Portfolio
					</a>
				</div>
			</div>
		</section>
	</div>
</main>

<!-- Skill Detail Modal -->
{#if showModal && selectedSkill}
	<div
		class="modal-overlay"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
		role="button"
		aria-label="Close modal"
		tabindex="-1"
	>
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-skill-name"
			tabindex="0"
		>
			<div class="modal-header" style="border-color: {selectedSkill.color};">
				<div class="skill-icon" style="background: {selectedSkill.color};">
					<span class="skill-initial">{selectedSkill.name.charAt(0)}</span>
				</div>
				<div class="skill-info">
					<h3 id="modal-skill-name" class="modal-skill-name">{selectedSkill.name}</h3>
					<p class="modal-constellation">from {selectedSkill.constellation}</p>
				</div>
				<button class="modal-close" onclick={closeModal} aria-label="Close modal">×</button>
			</div>

			<div class="modal-body">
				<div class="proficiency-section">
					<h4>Proficiency Level</h4>
					<div class="proficiency-display">
						<div class="proficiency-bar">
							<div
								class="proficiency-fill"
								style="width: {(selectedSkill.proficiency / 4) *
									100}%; background: {getProficiencyColor(selectedSkill.proficiency)};"
							></div>
						</div>
						<span
							class="proficiency-label"
							style="color: {getProficiencyColor(selectedSkill.proficiency)};"
						>
							{getProficiencyText(selectedSkill.proficiency)} ({selectedSkill.proficiency}/4)
						</span>
					</div>
				</div>

				<div class="description-section">
					<h4>Experience & Background</h4>
					<p class="skill-description">{selectedSkill.description}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ===== ABOUT PAGE SPECIFIC STYLES ===== */
	/* Following cosmic theme and clean code principles */

	/* Main Content Structure */
	.about-content {
		position: relative;
		z-index: 10;
		padding-top: 6rem; /* Account for fixed header */
		min-height: 100vh;
	}

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* Section Visibility Animations */
	section {
		opacity: 1;
		transform: translateY(0);
		transition: all 0.3s ease;
		margin-bottom: 6rem;
	}

	section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* ===== COSMIC HEADLINES ===== */
	.cosmic-headline {
		font-size: clamp(2rem, 5vw, 3.5rem);
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
		animation: cosmic-gradient-shift 8s ease-in-out infinite;
		text-align: center;
		margin-bottom: 3rem;
		line-height: 1.2;
		text-shadow: var(--cosmic-text-shadow);
	}

	/* ===== HERO/INTRODUCTION SECTION ===== */
	.hero-introduction {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.journey-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.story-card {
		background: rgba(15, 15, 35, 0.6);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(168, 85, 247, 0.3);
		border-radius: 1.5rem;
		padding: 2.5rem;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.story-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--cosmic-purple),
			var(--cosmic-pink),
			transparent
		);
		animation: cosmic-gradient-shift 3s ease-in-out infinite;
	}

	.story-question {
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: var(--cosmic-purple);
		margin-bottom: 2rem;
		font-weight: 600;
		text-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
	}

	.story-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.story-paragraph {
		color: rgba(255, 255, 255, 0.9);
		font-size: clamp(1rem, 2.5vw, 1.1rem);
		line-height: 1.7;
		text-align: left;
		margin: 0;
		transition: all 0.3s ease;
	}

	.story-paragraph:hover {
		color: rgba(255, 255, 255, 1);
		text-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
	}

	/* ===== SKILLS CONSTELLATION SECTION ===== */
	.skills-constellation {
		min-height: 80vh;
		display: flex;
		align-items: center;
		padding: 4rem 0;
	}

	/* Constellation Navigation */
	.constellation-nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.constellation-selector {
		background: rgba(15, 15, 35, 0.6);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 2rem;
		color: rgba(255, 255, 255, 0.8);
		padding: 0.8rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.constellation-selector::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--constellation-color);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.constellation-selector:hover::before,
	.constellation-selector.active::before {
		opacity: 0.2;
	}

	.constellation-selector:hover,
	.constellation-selector.active {
		border-color: var(--constellation-color);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
	}

	/* Constellation Viewer */
	.constellation-viewer {
		position: relative;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.constellation-container {
		position: relative;
		width: 100%;
		height: 500px;
		background: rgba(15, 15, 35, 0.4);
		backdrop-filter: blur(15px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 2rem;
		overflow: hidden;
		animation: constellation-entrance 1s ease-out;
	}

	.constellation-svg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.constellation-line {
		stroke-width: 1;
		stroke-dasharray: 2, 2;
		animation: constellation-pulse 3s ease-in-out infinite;
	}

	.star-group {
		cursor: pointer;
		animation: star-twinkle 2s ease-in-out infinite;
		animation-delay: var(--skill-delay);
	}

	.skill-star-bg {
		transition: all 0.3s ease;
	}

	.skill-star-core {
		cursor: pointer;
		transition: all 0.3s ease;
		filter: drop-shadow(0 0 6px currentColor);
	}

	.skill-star-core:hover,
	.skill-star-core:focus {
		r: 2;
		filter: drop-shadow(0 0 12px currentColor);
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	/* Skill Labels */
	.skill-labels {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.skill-label {
		position: absolute;
		transform: translate(-50%, -50%);
		background: rgba(15, 15, 35, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		pointer-events: auto;
		min-width: 100px;
		text-align: center;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
	}

	.skill-label:hover,
	.skill-label:focus {
		border-color: var(--constellation-color);
		background: rgba(15, 15, 35, 0.95);
		transform: translate(-50%, -50%) scale(1.05);
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
		outline: 2px solid var(--constellation-color);
		outline-offset: 2px;
	}

	.skill-name {
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.8rem;
		font-weight: 500;
		margin-bottom: 0.3rem;
		display: block;
	}

	.proficiency-dots {
		display: flex;
		justify-content: center;
		gap: 0.2rem;
	}

	.proficiency-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.proficiency-dot.filled {
		box-shadow: 0 0 4px currentColor;
	}

	/* ===== MODAL STYLES ===== */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		animation: modal-fade-in 0.3s ease-out;
		padding: 1rem;
	}

	.modal-content {
		background: rgba(15, 15, 35, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.5rem;
		max-width: 500px;
		width: 100%;
		position: relative;
		animation: modal-slide-up 0.3s ease-out;
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.skill-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: white;
		font-size: 1.5rem;
	}

	.skill-info {
		flex: 1;
	}

	.modal-skill-name {
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.3rem 0;
	}

	.modal-constellation {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
		margin: 0;
	}

	.modal-close {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: 2rem;
		cursor: pointer;
		transition: color 0.3s ease;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-close:hover {
		color: white;
	}

	.modal-body {
		padding: 1.5rem;
	}

	.proficiency-section {
		margin-bottom: 2rem;
	}

	.modal-body h4 {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.proficiency-display {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.proficiency-bar {
		flex: 1;
		height: 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}

	.proficiency-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.6s ease;
		animation: proficiency-glow 2s ease-in-out infinite alternate;
	}

	.proficiency-label {
		font-size: 0.9rem;
		font-weight: 500;
		white-space: nowrap;
	}

	.description-section {
		margin-bottom: 1rem;
	}

	.skill-description {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin: 0;
		font-size: 0.95rem;
	}

	/* ===== ANIMATIONS ===== */
	@keyframes constellation-entrance {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes constellation-pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.8;
		}
	}

	@keyframes star-twinkle {
		0%,
		100% {
			opacity: 0.8;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes pulse-ring {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 0.3;
			transform: scale(1.2);
		}
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
	}

	@keyframes modal-fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes modal-slide-up {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes proficiency-glow {
		0% {
			box-shadow: 0 0 5px currentColor;
		}
		100% {
			box-shadow: 0 0 15px currentColor;
		}
	}

	/* ===== PROJECTS TEASER SECTION ===== */
	.projects-teaser {
		text-align: center;
		padding: 3rem 0;
	}

	.teaser-content {
		max-width: 600px;
		margin: 0 auto;
	}

	.teaser-text {
		color: rgba(255, 255, 255, 0.8);
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	/* ===== CONTACT CTA SECTION ===== */
	.contact-cta {
		text-align: center;
		padding: 3rem 0 6rem;
	}

	.cta-content {
		max-width: 700px;
		margin: 0 auto;
	}

	.cta-text {
		color: rgba(255, 255, 255, 0.8);
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		line-height: 1.6;
		margin-bottom: 3rem;
	}

	.social-constellation {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.celestial-body {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgba(168, 85, 247, 0.1);
		border: 2px solid rgba(168, 85, 247, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.celestial-body::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, var(--cosmic-purple), var(--cosmic-pink));
		opacity: 0;
		transition: opacity 0.3s ease;
		border-radius: 50%;
	}

	.celestial-body:hover::before {
		opacity: 0.2;
	}

	.celestial-body:hover {
		transform: scale(1.1);
		border-color: var(--cosmic-purple);
		box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
	}

	.social-icon {
		width: 28px;
		height: 28px;
		color: rgba(255, 255, 255, 0.9);
		position: relative;
		z-index: 2;
		transition: color 0.3s ease;
	}

	/* ===== COSMIC BUTTONS ===== */
	.cosmic-button {
		background: linear-gradient(45deg, var(--cosmic-purple), var(--cosmic-pink));
		border: none;
		border-radius: 2rem;
		color: white;
		font-weight: 600;
		font-size: 1.1rem;
		padding: 1rem 2.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		text-decoration: none;
		display: inline-block;
		margin: 0.5rem;
	}

	.cosmic-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.6s ease;
	}

	.cosmic-button:hover::before {
		left: 100%;
	}

	.cosmic-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
	}

	.cosmic-button.secondary {
		background: transparent;
		border: 2px solid var(--cosmic-purple);
		color: var(--cosmic-purple);
	}

	.cosmic-button.secondary:hover {
		background: var(--cosmic-purple);
		color: white;
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.story-card {
			padding: 2rem 1.5rem;
		}

		.constellation-nav {
			gap: 0.5rem;
		}

		.constellation-selector {
			padding: 0.6rem 1rem;
			font-size: 0.8rem;
		}

		.constellation-container {
			height: 400px;
		}

		.skill-label {
			min-width: 80px;
			padding: 0.4rem 0.8rem;
		}

		.skill-name {
			font-size: 0.7rem;
		}

		.proficiency-dots {
			gap: 0.15rem;
		}

		.proficiency-dot {
			width: 3px;
			height: 3px;
		}

		.modal-content {
			margin: 1rem;
			max-width: none;
		}

		.modal-header {
			padding: 1rem;
		}

		.modal-body {
			padding: 1rem;
		}

		.skill-icon {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
		}

		.modal-skill-name {
			font-size: 1.3rem;
		}

		.celestial-body {
			width: 50px;
			height: 50px;
		}

		.social-icon {
			width: 24px;
			height: 24px;
		}

		.cosmic-button {
			font-size: 1rem;
			padding: 0.8rem 2rem;
		}
	}

	@media (max-width: 480px) {
		.about-content {
			padding-top: 5rem;
		}

		.social-constellation {
			gap: 1rem;
		}
	}
</style>
