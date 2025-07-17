<script lang="ts">
	import { goto } from '$app/navigation';

	// Repository interface
	interface Repository {
		id: number;
		name: string;
		full_name: string;
		description: string;
		html_url: string;
		homepage: string;
		language: string;
		stargazers_count: number;
		forks_count: number;
		open_issues_count: number;
		created_at: string;
		updated_at: string;
		topics: string[];
		visibility: string;
		size: number;
	}

	interface GitHubUser {
		login: string;
		name: string;
		bio: string;
		avatar_url: string;
		public_repos: number;
		followers: number;
		following: number;
		html_url: string;
	}

	// State management
	let repositories: Repository[] = $state([]);
	let userProfile: GitHubUser | null = $state(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let selectedRepo: Repository | null = $state(null);
	let showModal = $state(false);
	let filter = $state('all');
	let searchTerm = $state('');

	// Language colors for visual coding
	const languageColors: Record<string, string> = {
		JavaScript: '#f1e05a',
		TypeScript: '#3178c6',
		Python: '#3776ab',
		Java: '#ed8b00',
		'C++': '#f34b7d',
		HTML: '#e34c26',
		CSS: '#1572b6',
		Svelte: '#ff3e00',
		React: '#61dafb',
		Vue: '#4fc08d',
		Rust: '#dea584',
		Go: '#00add8',
		PHP: '#777bb4',
		Ruby: '#cc342d',
		Swift: '#fa7343',
		Kotlin: '#a97bff',
		Dart: '#0175c2',
		Shell: '#89e051'
	};

	// Fetch data from our API
	async function fetchGitHubData() {
		try {
			isLoading = true;
			error = null;
			console.log('Starting GitHub data fetch...');

			// Fetch repositories and user profile concurrently
			const [reposResponse, userResponse] = await Promise.all([
				fetch('/api/github?endpoint=repos'),
				fetch('/api/github?endpoint=user')
			]);

			console.log('API responses received:', {
				reposStatus: reposResponse.status,
				userStatus: userResponse.status
			});

			if (!reposResponse.ok) {
				const errorText = await reposResponse.text();
				console.error('Repos API error:', errorText);
				throw new Error(`Failed to fetch repositories: ${reposResponse.status} - ${errorText}`);
			}
			if (!userResponse.ok) {
				const errorText = await userResponse.text();
				console.error('User API error:', errorText);
				throw new Error(`Failed to fetch user profile: ${userResponse.status} - ${errorText}`);
			}

			const repoData = await reposResponse.json();
			const userData = await userResponse.json();

			console.log('GitHub data fetched successfully:', {
				repoCount: repoData.length,
				user: userData.login
			});

			repositories = repoData;
			userProfile = userData;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			console.error('Error fetching GitHub data:', err);
		} finally {
			isLoading = false;
			console.log('Loading state set to false');
		}
	}
	// Filter repositories based on search term and filter type
	const filteredRepositories = $derived(
		repositories.filter((repo) => {
			const matchesSearch =
				repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

			if (filter === 'all') return matchesSearch;
			if (filter === 'popular') return matchesSearch && repo.stargazers_count > 0;
			if (filter === 'recent') {
				const oneMonthAgo = new Date();
				oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
				return matchesSearch && new Date(repo.updated_at) > oneMonthAgo;
			}
			return matchesSearch && repo.language?.toLowerCase() === filter.toLowerCase();
		})
	);

	// Get unique languages from repositories
	const availableLanguages = $derived([
		...new Set(repositories.map((repo) => repo.language).filter(Boolean))
	]);

	// Optimized date formatting using memoized formatter
	function formatDate(dateString: string): string {
		return dateFormatter.format(new Date(dateString));
	}

	// Get language color
	function getLanguageColor(language: string): string {
		return languageColors[language] || '#6b7280';
	}

	// Open repository modal
	function openRepoModal(repo: Repository) {
		selectedRepo = repo;
		showModal = true;

		// Focus the modal when it opens
		setTimeout(() => {
			const modal = document.querySelector('.modal-overlay') as HTMLElement;
			if (modal) modal.focus();
		}, 100);
	}

	// Close modal
	function closeModal() {
		showModal = false;
		selectedRepo = null;
	}

	// Optimized helper functions
	function openGitHubProfile() {
		if (userProfile) {
			window.open(userProfile.html_url, '_blank', 'noopener,noreferrer');
		}
	}

	// Memoized date formatter for better performance
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	// Effect to fetch data on component mount
	$effect(() => {
		fetchGitHubData();
	});
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
			{#each Array.from({ length: 80 }, (_, i) => i) as i}
				<div
					class="cosmic-star star-{(i % 3) + 1}"
					style="--delay: {Math.random() * 4}s; --x: {Math.random() * 100}%; --y: {Math.random() *
						100}%;"
				></div>
			{/each}
		</div>
	</div>

	<!-- Main Content -->
	<div class="portfolio-content">
		<!-- Hero Section -->
		<section class="portfolio-hero">
			<div class="section-container">
				<h1 class="cosmic-headline">My Coding Universe</h1>
				<p class="hero-subtitle">
					A collection of projects from my GitHub galaxy, automatically synchronized and ready to
					explore
				</p>

				{#if userProfile}
					<div class="github-profile-card">
						<div class="profile-header">
							<img src={userProfile.avatar_url} alt="GitHub Avatar" class="profile-avatar" />
							<div class="profile-info">
								<h2 class="profile-name">{userProfile.name || userProfile.login}</h2>
								<p class="profile-username">@{userProfile.login}</p>
								{#if userProfile.bio}
									<p class="profile-bio">{userProfile.bio}</p>
								{/if}
							</div>
							<button class="github-link-btn" onclick={openGitHubProfile}>
								<svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
									/>
								</svg>
								View on GitHub
							</button>
						</div>

						<div class="profile-stats">
							<div class="stat-item">
								<span class="stat-number">{userProfile.public_repos}</span>
								<span class="stat-label">Repositories</span>
							</div>
							<div class="stat-item">
								<span class="stat-number">{userProfile.followers}</span>
								<span class="stat-label">Followers</span>
							</div>
							<div class="stat-item">
								<span class="stat-number">{userProfile.following}</span>
								<span class="stat-label">Following</span>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>

		<!-- Loading State -->
		{#if isLoading}
			<section class="loading-section">
				<div class="section-container">
					<div class="cosmic-loader">
						<div class="loader-ring"></div>
						<div class="loader-ring"></div>
						<div class="loader-ring"></div>
						<p class="loader-text">Fetching repositories from the GitHub cosmos...</p>
					</div>
				</div>
			</section>
		{/if}

		<!-- Error State -->
		{#if error}
			<section class="error-section">
				<div class="section-container">
					<div class="error-card">
						<h2>Houston, we have a problem! 🚀</h2>
						<p>{error}</p>
						<button class="cosmic-button" onclick={fetchGitHubData}>Try Again</button>
					</div>
				</div>
			</section>
		{/if}

		<!-- Repository Grid -->
		{#if !isLoading && !error && repositories.length > 0}
			<section class="repositories-section">
				<div class="section-container">
					<!-- Search and Filter Controls -->
					<div class="controls-container">
						<div class="search-container">
							<input
								type="text"
								placeholder="Search repositories..."
								bind:value={searchTerm}
								class="search-input"
							/>
							<svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
								/>
							</svg>
						</div>

						<div class="filter-container">
							<button
								class="filter-btn"
								class:active={filter === 'all'}
								onclick={() => (filter = 'all')}
							>
								All
							</button>
							<button
								class="filter-btn"
								class:active={filter === 'popular'}
								onclick={() => (filter = 'popular')}
							>
								Popular
							</button>
							<button
								class="filter-btn"
								class:active={filter === 'recent'}
								onclick={() => (filter = 'recent')}
							>
								Recent
							</button>
							{#each availableLanguages.slice(0, 5) as language}
								<button
									class="filter-btn language-filter"
									class:active={filter === language}
									onclick={() => (filter = language)}
									style="--language-color: {getLanguageColor(language)}"
								>
									{language}
								</button>
							{/each}
						</div>
					</div>

					<!-- Repository Grid -->
					<div class="repositories-grid">
						{#each filteredRepositories as repo (repo.id)}
							<button
								class="repository-card"
								onclick={() => openRepoModal(repo)}
								onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && openRepoModal(repo)}
								aria-label="View details for {repo.name} repository"
							>
								<div class="repo-header">
									<h3 class="repo-name">{repo.name}</h3>
									<div class="repo-meta">
										{#if repo.language}
											<span
												class="language-badge"
												style="background-color: {getLanguageColor(
													repo.language
												)}20; color: {getLanguageColor(repo.language)}"
											>
												{repo.language}
											</span>
										{/if}
										{#if repo.visibility === 'private'}
											<span class="visibility-badge">Private</span>
										{/if}
									</div>
								</div>

								{#if repo.description}
									<p class="repo-description">{repo.description}</p>
								{/if}

								{#if repo.topics && repo.topics.length > 0}
									<div class="repo-topics">
										{#each repo.topics.slice(0, 3) as topic}
											<span class="topic-tag">{topic}</span>
										{/each}
										{#if repo.topics.length > 3}
											<span class="topic-more">+{repo.topics.length - 3}</span>
										{/if}
									</div>
								{/if}

								<div class="repo-stats">
									<div class="stat-group">
										<svg class="stat-icon star-icon" viewBox="0 0 24 24" fill="currentColor">
											<path
												d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
											/>
										</svg>
										<span>{repo.stargazers_count}</span>
									</div>
									<div class="stat-group">
										<svg class="stat-icon fork-icon" viewBox="0 0 24 24" fill="currentColor">
											<path
												d="M6 2l-2 0c-1.1 0-2 0.9-2 2l0 1c0 1.1 0.9 2 2 2l2 0c1.1 0 2-0.9 2-2l0-1c0-1.1-0.9-2-2-2zm0 6l-2 0c-1.1 0-2 0.9-2 2l0 1c0 1.1 0.9 2 2 2l2 0c1.1 0 2-0.9 2-2l0-1c0-1.1-0.9-2-2-2zm12-6l-2 0c-1.1 0-2 0.9-2 2l0 1c0 1.1 0.9 2 2 2l2 0c1.1 0 2-0.9 2-2l0-1c0-1.1-0.9-2-2-2z"
											/>
										</svg>
										<span>{repo.forks_count}</span>
									</div>
									<div class="stat-group">
										<svg class="stat-icon update-icon" viewBox="0 0 24 24" fill="currentColor">
											<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span>{formatDate(repo.updated_at)}</span>
									</div>
								</div>

								<div class="repo-overlay">
									<span>Click to explore</span>
								</div>
							</button>
						{/each}
					</div>

					{#if filteredRepositories.length === 0}
						<div class="empty-state">
							<h3>No repositories found</h3>
							<p>Try adjusting your search or filter criteria</p>
						</div>
					{/if}
				</div>
			</section>

			<!-- Call to Action -->
			<section class="cta-section">
				<div class="section-container">
					<h2 class="cosmic-headline">Ready to Learn More?</h2>
					<p class="cta-text">
						Dive deeper into my technical background, skills, and the story behind the code
					</p>
					<a
						href="/portfolio/about"
						class="cosmic-button primary"
						data-sveltekit-preload-data="hover"
					>
						Explore My Technical Journey
					</a>
				</div>
			</section>
		{/if}
	</div>
</main>

<!-- Repository Detail Modal -->
{#if showModal && selectedRepo}
	<div
		class="modal-overlay"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
		role="button"
		aria-label="Close modal"
		tabindex="-1"
	>
		<div
			class="modal-content repo-modal"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-repo-name"
			tabindex="0"
		>
			<div class="modal-header">
				<div class="repo-modal-header">
					<h3 id="modal-repo-name" class="modal-repo-name">{selectedRepo.name}</h3>
					{#if selectedRepo.language}
						<span
							class="language-badge large"
							style="background-color: {getLanguageColor(
								selectedRepo.language
							)}30; color: {getLanguageColor(selectedRepo.language)}"
						>
							{selectedRepo.language}
						</span>
					{/if}
				</div>
				<button class="modal-close" onclick={closeModal} aria-label="Close modal">×</button>
			</div>

			<div class="modal-body">
				{#if selectedRepo.description}
					<div class="description-section">
						<h4>Description</h4>
						<p>{selectedRepo.description}</p>
					</div>
				{/if}

				{#if selectedRepo.topics && selectedRepo.topics.length > 0}
					<div class="topics-section">
						<h4>Topics</h4>
						<div class="topics-grid">
							{#each selectedRepo.topics as topic}
								<span class="topic-tag large">{topic}</span>
							{/each}
						</div>
					</div>
				{/if}

				<div class="stats-section">
					<h4>Repository Statistics</h4>
					<div class="stats-grid">
						<div class="stat-card">
							<svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
							</svg>
							<div class="stat-info">
								<span class="stat-value">{selectedRepo.stargazers_count}</span>
								<span class="stat-label">Stars</span>
							</div>
						</div>
						<div class="stat-card">
							<svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M6 2l-2 0c-1.1 0-2 0.9-2 2l0 1c0 1.1 0.9 2 2 2l2 0c1.1 0 2-0.9 2-2l0-1c0-1.1-0.9-2-2-2z"
								/>
							</svg>
							<div class="stat-info">
								<span class="stat-value">{selectedRepo.forks_count}</span>
								<span class="stat-label">Forks</span>
							</div>
						</div>
						<div class="stat-card">
							<svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
								/>
							</svg>
							<div class="stat-info">
								<span class="stat-value">{selectedRepo.open_issues_count}</span>
								<span class="stat-label">Issues</span>
							</div>
						</div>
						<div class="stat-card">
							<svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
								/>
							</svg>
							<div class="stat-info">
								<span class="stat-value">{Math.round(selectedRepo.size / 1024)}KB</span>
								<span class="stat-label">Size</span>
							</div>
						</div>
					</div>
				</div>

				<div class="dates-section">
					<h4>Timeline</h4>
					<div class="dates-grid">
						<div class="date-item">
							<span class="date-label">Created:</span>
							<span class="date-value">{formatDate(selectedRepo.created_at)}</span>
						</div>
						<div class="date-item">
							<span class="date-label">Last Updated:</span>
							<span class="date-value">{formatDate(selectedRepo.updated_at)}</span>
						</div>
					</div>
				</div>

				<div class="actions-section">
					<a
						href={selectedRepo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="cosmic-button primary"
					>
						<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View Repository
					</a>
					{#if selectedRepo.homepage}
						<a
							href={selectedRepo.homepage}
							target="_blank"
							rel="noopener noreferrer"
							class="cosmic-button secondary"
						>
							<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M10 6V8H5V19H16V14H18V20A1 1 0 0 1 17 21H4A1 1 0 0 1 3 20V7A1 1 0 0 1 4 6H10ZM21 3V11H19L19 6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"
								/>
							</svg>
							Live Demo
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ===== PORTFOLIO PAGE SPECIFIC STYLES ===== */
	/* Following cosmic theme and clean code principles */

	/* Main Content Structure */
	.portfolio-content {
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

	/* ===== HERO SECTION ===== */
	.portfolio-hero {
		padding: 4rem 0;
		text-align: center;
	}

	.hero-subtitle {
		color: rgba(255, 255, 255, 0.8);
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		line-height: 1.6;
		margin-bottom: 3rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	/* ===== GITHUB PROFILE CARD ===== */
	.github-profile-card {
		background: rgba(15, 15, 35, 0.6);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(168, 85, 247, 0.3);
		border-radius: 1.5rem;
		padding: 2rem;
		margin: 0 auto 2rem;
		max-width: 600px;
		position: relative;
		overflow: hidden;
		animation: card-entrance 0.8s ease-out;
	}

	.github-profile-card::before {
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

	.profile-header {
		display: flex;
		align-items: flex-start;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.profile-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 3px solid var(--cosmic-purple);
		box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
	}

	.profile-info {
		flex: 1;
		text-align: left;
	}

	.profile-name {
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.profile-username {
		color: var(--cosmic-purple);
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
	}

	.profile-bio {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		line-height: 1.4;
		margin: 0;
	}

	.github-link-btn {
		background: transparent;
		border: 1px solid var(--cosmic-purple);
		color: var(--cosmic-purple);
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		white-space: nowrap;
	}

	.github-link-btn:hover {
		background: var(--cosmic-purple);
		color: white;
		transform: translateY(-2px);
	}

	.github-icon {
		width: 16px;
		height: 16px;
	}

	.profile-stats {
		display: flex;
		justify-content: space-around;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		display: block;
		color: var(--cosmic-amber);
		font-size: 1.5rem;
		font-weight: 700;
	}

	.stat-label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.8rem;
	}

	/* ===== LOADING STATE ===== */
	.loading-section {
		padding: 4rem 0;
		text-align: center;
	}

	.cosmic-loader {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.loader-ring {
		width: 60px;
		height: 60px;
		border: 3px solid rgba(168, 85, 247, 0.3);
		border-top-color: var(--cosmic-purple);
		border-radius: 50%;
		animation: cosmic-spin 1s linear infinite;
		position: absolute;
	}

	.loader-ring:nth-child(2) {
		width: 80px;
		height: 80px;
		animation-duration: 1.5s;
		animation-direction: reverse;
	}

	.loader-ring:nth-child(3) {
		width: 100px;
		height: 100px;
		animation-duration: 2s;
	}

	.loader-text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.1rem;
		margin-top: 60px;
	}

	/* ===== ERROR STATE ===== */
	.error-section {
		padding: 4rem 0;
		text-align: center;
	}

	.error-card {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 1rem;
		padding: 2rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.error-card h2 {
		color: #ef4444;
		margin: 0 0 1rem 0;
	}

	.error-card p {
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 1.5rem 0;
	}

	/* ===== CONTROLS ===== */
	.controls-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.search-container {
		position: relative;
		max-width: 400px;
		margin: 0 auto;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1rem 1rem 3rem;
		background: rgba(15, 15, 35, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 2rem;
		color: white;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--cosmic-purple);
		box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		color: rgba(255, 255, 255, 0.5);
	}

	.filter-container {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		background: rgba(15, 15, 35, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.5rem;
		color: rgba(255, 255, 255, 0.8);
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.filter-btn.language-filter {
		border-color: var(--language-color, rgba(255, 255, 255, 0.2));
	}

	.filter-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--cosmic-purple);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.filter-btn.language-filter::before {
		background: var(--language-color);
	}

	.filter-btn:hover::before,
	.filter-btn.active::before {
		opacity: 0.2;
	}

	.filter-btn:hover,
	.filter-btn.active {
		border-color: var(--cosmic-purple);
		color: white;
		transform: translateY(-2px);
	}

	.filter-btn.language-filter:hover,
	.filter-btn.language-filter.active {
		border-color: var(--language-color);
	}

	/* ===== REPOSITORY GRID ===== */
	.repositories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.repository-card {
		/* Reset button styles */
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(15, 15, 35, 0.6);
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		color: inherit;

		/* Card styles */
		backdrop-filter: blur(15px);
		border-radius: 1rem;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		height: fit-content;
		animation: card-entrance 0.6s ease-out;
		display: block;
		width: 100%;
	}

	.repository-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(
			90deg,
			var(--cosmic-purple),
			var(--cosmic-pink),
			var(--cosmic-blue)
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.repository-card:hover::before {
		opacity: 1;
	}

	.repository-card:hover {
		transform: translateY(-5px);
		border-color: rgba(168, 85, 247, 0.5);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
	}

	.repo-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.repo-name {
		color: white;
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
	}

	.repo-meta {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		align-items: flex-end;
	}

	.language-badge {
		background: rgba(168, 85, 247, 0.2);
		color: var(--cosmic-purple);
		padding: 0.2rem 0.6rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.language-badge.large {
		padding: 0.4rem 1rem;
		font-size: 0.9rem;
	}

	.visibility-badge {
		background: rgba(251, 191, 36, 0.2);
		color: var(--cosmic-amber);
		padding: 0.2rem 0.6rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.repo-description {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0 0 1rem 0;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.repo-topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 1rem;
	}

	.topic-tag {
		background: rgba(59, 130, 246, 0.2);
		color: var(--cosmic-blue);
		padding: 0.2rem 0.5rem;
		border-radius: 0.8rem;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.topic-tag.large {
		padding: 0.4rem 0.8rem;
		font-size: 0.8rem;
	}

	.topic-more {
		background: rgba(107, 114, 128, 0.2);
		color: rgba(255, 255, 255, 0.6);
		padding: 0.2rem 0.5rem;
		border-radius: 0.8rem;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.repo-stats {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.stat-group {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.8rem;
	}

	.stat-icon {
		width: 14px;
		height: 14px;
	}

	.star-icon {
		color: var(--cosmic-amber);
	}

	.fork-icon {
		color: var(--cosmic-blue);
	}

	.update-icon {
		color: var(--cosmic-purple);
	}

	.repo-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(168, 85, 247, 0.1);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		color: white;
		font-weight: 600;
	}

	.repository-card:hover .repo-overlay {
		opacity: 1;
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

	.modal-content.repo-modal {
		background: rgba(15, 15, 35, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.5rem;
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		animation: modal-slide-up 0.3s ease-out;
	}

	.repo-modal-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.modal-repo-name {
		color: white;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

	.modal-body h4 {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.description-section {
		margin-bottom: 2rem;
	}

	.description-section p {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin: 0;
	}

	.topics-section {
		margin-bottom: 2rem;
	}

	.topics-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.stats-section {
		margin-bottom: 2rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
	}

	.stat-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.8rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.stat-card .stat-icon {
		width: 20px;
		height: 20px;
		color: var(--cosmic-purple);
	}

	.stat-info {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		color: white;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.stat-label {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.8rem;
	}

	.dates-section {
		margin-bottom: 2rem;
	}

	.dates-grid {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.date-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.8rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
	}

	.date-label {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
	}

	.date-value {
		color: white;
	}

	.actions-section {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.button-icon {
		width: 16px;
		height: 16px;
	}

	/* ===== EMPTY STATE ===== */
	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.empty-state h3 {
		margin: 0 0 1rem 0;
		color: rgba(255, 255, 255, 0.8);
	}

	.empty-state p {
		margin: 0;
	}

	/* ===== CTA SECTION ===== */
	.cta-section {
		padding: 4rem 0;
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.cta-text {
		color: rgba(255, 255, 255, 0.8);
		font-size: clamp(1.1rem, 2.5vw, 1.3rem);
		line-height: 1.6;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	/* ===== COSMIC BUTTONS ===== */
	.cosmic-button {
		background: linear-gradient(45deg, var(--cosmic-purple), var(--cosmic-pink));
		border: none;
		border-radius: 2rem;
		color: white;
		font-weight: 600;
		font-size: 1rem;
		padding: 0.8rem 2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.25rem;
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

	/* ===== ANIMATIONS ===== */
	@keyframes cosmic-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes card-entrance {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes modal-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modal-slide-up {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.portfolio-content {
			padding-top: 5rem;
		}

		.github-profile-card {
			padding: 1.5rem;
		}

		.profile-header {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}

		.profile-info {
			text-align: center;
		}

		.github-link-btn {
			align-self: center;
		}

		.repositories-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.filter-container {
			gap: 0.3rem;
		}

		.filter-btn {
			padding: 0.4rem 0.8rem;
			font-size: 0.8rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.actions-section {
			flex-direction: column;
		}

		.cosmic-button {
			justify-content: center;
		}

		.modal-content.repo-modal {
			margin: 0.5rem;
			max-height: 95vh;
		}

		.modal-header {
			padding: 1rem;
		}

		.modal-body {
			padding: 1rem;
		}
	}

	@media (max-width: 480px) {
		.controls-container {
			gap: 1rem;
		}

		.search-container {
			max-width: none;
		}

		.repository-card {
			padding: 1rem;
		}

		.repo-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
