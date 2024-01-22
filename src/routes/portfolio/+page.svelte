<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { CardContent, CardFooter, Card } from '$lib/components/ui/card';
	import { SearchIcon } from 'lucide-svelte';
	import { derived, writable } from 'svelte/store';

	//creating a store for search query
	const searchQuery = writable('');

	const selectedTags = writable(new Set<string>(['All']));
	const tags = ['All', 'TypeScript', 'Python', 'Rust', 'C++', 'Java'];
	const projects = [
		{
			title: 'Project C',
			img: 'https://placehold.co/600x400',
			description: 'A data analysis tool',
			tags: ['C++'],
			githubLink: 'https://github.com/project-c'
		},
		{
			title: 'Project C',
			img: 'https://placehold.co/600x400',
			description: 'A data analysis tool',
			tags: ['C++'],
			githubLink: 'https://github.com/project-c'
		},
		{
			title: 'Project C',
			img: 'https://placehold.co/600x400',
			description: 'A data analysis tool',
			tags: ['C++'],
			githubLink: 'https://github.com/project-c'
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
				<Card class="w-80 lg:w-full">
					<img
						alt="Project C"
						class="h-48 w-full rounded-t-lg object-cover"
						height="200"
						src={projects.img}
						style="aspect-ratio: 200/200; object-fit: cover"
						width="200"
					/>
					<CardContent>
						<h3 class="text-lg font-semibold">Project C</h3>
						<p class="text-sm text-muted-foreground">A data analysis tool</p>
					</CardContent>
					<CardFooter class="flex justify-between">
						<!-- badges  -->
						{#each projects.tags as tag}
							<Badge class="mr-2" variant="default">{tag}</Badge>
						{/each}
						<Button class="text-xs" variant="outline" href={projects.githubLink} target="_blank"
							>View on Github</Button
						>
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
