<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, Card } from '$lib/components/ui/card';
	import { SearchIcon } from 'lucide-svelte';
	import { derived, writable } from 'svelte/store';
	import sortingVisualizer2 from '$lib/static//portfolioImgs/sortingVisualizer2.png';
	import melodyCat from '$lib/static/portfolioImgs/melodyCat.png';
	import pokeUI from '$lib/static/portfolioImgs/pokeUI.png';
	import audioVisualizer2 from '$lib/static/portfolioImgs/audioVisualizerv2.png';
	interface Projects {
		title: string;
		img: string;
		description: string;
		tags: string[];
		githubLink: string;
	}

	//creating a store for search query
	const searchQuery = writable('');

	const selectedTags = writable(new Set<string>(['All']));
	const tags = ['All', 'Javascript', 'Bot', 'API', 'Music', 'Python', 'Rust', 'C++', 'Java'];
	const projects: Projects[] = [
		{
			title: 'Sorting Visualizer 2,0',
			img: sortingVisualizer2,
			description:
				'A sorting algorithm visualizer that shows how the algorithm works as well as speed comparisons',
			tags: ['Javascript'],
			githubLink: 'https://github.com/nix24/sortingVisualizer'
		},
		{
			title: 'Melody Cat',
			img: melodyCat,
			description: 'Discord bot that can play songs from Spotify and Youtube',
			tags: ['Javascript', 'Bot', 'Music'],
			githubLink: 'https://github.com/nix24/MelodyCat'
		},
		{
			title: 'Poke UI',
			img: pokeUI,
			description:
				'PokeAPI based UI that allows you to search for pokemons and their stats/Abilities',
			tags: ['TypeScript', 'API'],
			githubLink: 'https://github.com/nix24/pokedex-skeletonui'
		},
		{
			title: 'Audio Visualizer 2.0',
			img: audioVisualizer2,
			description:
				'audio visualizer that dynamically colors bars and visualize audio from mp3 and youtube videos',
			tags: ['Javascript', 'Music'],
			githubLink: 'https://github.com/nix24/audioVisualizerv2'
		}

		// Add more projects here
	];

	//function filtering projects based on search query and tags
	// Function to filter projects based on search query and selected tags
	/**
	 * Filters the projects based on the search query and selected tags.
	 * @param {string} searchQuery - The search query entered by the user.
	 * @param {Set<string>} selectedTags - The set of selected tags.
	 * @returns {Array<object>} - The filtered projects.
	 */
	const filteredProjects = derived([searchQuery, selectedTags], ([$searchQuery, $selectedTags]) => {
		return projects.filter(
			(project) =>
				project.title.toLowerCase().includes($searchQuery.toLowerCase()) &&
				($selectedTags.has('All') || project.tags.some((tag) => $selectedTags.has(tag)))
		);
	});

	/**
	 * Toggles the selected tag.
	 * @param {string} tag - The tag to toggle.
	 */
	const toggleTag = (tag: string) => {
		selectedTags.set(new Set(tag === 'All' ? ['All'] : [tag]));
	};
</script>

<main>
	<div class="container mx-auto py-8">
		<h1 class="mb-6 text-5xl font-bold">Projects</h1>
		<div class="relative mb-4 flex items-center">
			<Input
				bind:value={$searchQuery}
				class="mr-2 flex-1 rounded-md border-2"
				placeholder="Search projects by language, technology, or name"
			/>
			<SearchIcon class="absolute right-5 top-5 -translate-y-1/2 transform text-2xl" />
		</div>
		<div class="mb-4">
			<span class="mr-2 text-sm font-medium">Tags</span>
			{#each tags as tag}
				<button
					class="transition-ea mr-2 cursor-pointer rounded-lg px-3 text-sm hover:bg-primary {$selectedTags.has(
						tag
					)
						? 'bg-primary text-primary-foreground'
						: 'bg-secondary text-secondary-foreground'}"
					on:click={() => {
						toggleTag(tag);
					}}
				>
					{tag}
				</button>
			{/each}
		</div>
		<hr class="mb-6" />
		<div class=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each $filteredProjects as projects}
				<Card class="w-80 space-y-3 lg:w-full">
					<img
						alt="Project C"
						class="h-48 w-full rounded-t-lg object-cover"
						height="200"
						src={projects.img}
						style="aspect-ratio: 200/200; object-fit: cover"
						width="200"
					/>
					<CardContent>
						<h3 class="text-lg font-semibold">{projects.title}</h3>
						<p class="text-sm text-muted-foreground">{projects.description}</p>
					</CardContent>
					<CardFooter class="flex flex-wrap justify-evenly">
						<!-- badges  -->
						{#each projects.tags as tag}
							<Badge class="mr-2" variant="default">{tag}</Badge>
						{/each}
						<div class="flex flex-wrap items-center p-5">
							<Button class="text-xs" variant="outline" href={projects.githubLink} target="_blank"
								>View on Github</Button
							>
						</div>
					</CardFooter>
				</Card>
			{/each}
			{#if $filteredProjects.length === 0}
				<div class="col-span-full text-center">
					<p class="text-2xl font-semibold text-muted-foreground">No projects found</p>
				</div>
			{/if}
		</div>
	</div>
</main>
