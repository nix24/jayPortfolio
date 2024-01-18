<script lang="ts">
	import c from '$lib/static/c.svg';
	import Javascript from '$lib/static/javascript.svg';
	import typescript from '$lib/static/typescript.svg';
	import python from '$lib/static/python.svg';
	import rust from '$lib/static/rust.svg';

	import nextjs from '$lib/static/next-js.svg';
	import sveltekit from '$lib/static/svelte-logo.svg';

	import mongodb from '$lib/static/mongodb.svg';
	import mysql from '$lib/static/mysql.svg';

	import { Badge } from '$lib/components/ui/badge';
	import { CardTitle, CardContent, Card, CardDescription } from '$lib/components/ui/card';
	import { Star } from 'lucide-svelte';

	import placeholder from '$lib/static/guy_placeholder.webp';
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let isAnimate = false;

	onMount(() => {
		isAnimate = true;
	});

	// using badges to list out, Adaptable, problem-Solver, Strong-Fundementals, Team-Leader, Efficient, Fast-Learner
	let skills = [
		'Adaptable',
		'Problem-Solver',
		'Strong-Fundementals',
		'Team-Leader',
		'Efficient',
		'Fast-Learner'
	];

	let languages = [
		{ name: 'Typescript', icon: typescript, level: 5 },
		{ name: 'Javascript', icon: Javascript, level: 5 },
		{ name: 'Python', icon: python, level: 4 },
		{ name: 'C++', icon: c, level: 3 },
		{ name: 'Rust', icon: rust, level: 3 }
	];

	let tooling = [
		{
			name: 'NextJs',
			description: 'The React framework for web and native user interfaces.',
			icon: nextjs
		},
		{
			name: 'SvelteKit',
			description: 'Web development, streamlined.',
			icon: sveltekit
		},
		{
			name: 'MongoDB',
			description: 'a document database for querying and indexing.',
			icon: mongodb
		},
		{
			name: 'MySQL',
			description: 'An open-source relational database management system.',
			icon: mysql
		}
	];

	//creating function that checks if the element is in view
	function isElementInViewport(el: { getBoundingClientRect: () => any }) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
</script>

<main class=" font-sans leading-normal tracking-normal">
	<div class="container mx-auto my-10 p-8">
		<div class="grid grid-cols-1 md:grid-cols-12">
			<div class="p-6 md:col-span-7">
				<h1 class="mb-4 text-6xl font-bold">So Who am I Anyways?</h1>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia obcaecati vitae est eos
					quam corporis harum molestiae laudantium! Debitis, beatae? Sint eius vitae minima!
					Reiciendis aliquid in ab facilis corrupti?
				</p>

				<div class="mb-6">
					<h2 class="my-6 text-2xl font-semibold">Key Skills</h2>
					<!-- using badges to list out, Adaptable, problem-Solver, Strong-Fundementals, Team-Leader, Efficient, Fast-Learner -->
					<div class="container grid grid-cols-2 gap-4 md:grid-cols-3">
						{#each skills as skill, i (i)}
							{#if isAnimate}
								<div in:scale={{ delay: i * 200, duration: 500, opacity: 1, start: 0 }}>
									<Badge
										variant="secondary"
										class="mx-auto border border-slate-800 px-2 dark:border-slate-100"
									>
										<p class="text-center">
											{skill}
										</p>
									</Badge>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
			<div class="p-6 md:col-span-5">
				<img
					in:fly={{ y: 1000, delay: 500, duration: 1000 }}
					class="rounded-lg"
					src={placeholder}
					alt="guy_placeholder"
				/>
			</div>
			<!-- langauges. level is determined by circles with a bg-primary color  -->
			<!-- modern and clean design but creative in showing off my skills -->
			<section class="p-6 md:col-span-10">
				<h2 class="mb-2 text-2xl font-semibold">Languages</h2>
				<div class="container grid grid-cols-2 gap-4 md:grid-cols-3">
					{#each languages as { name, icon, level }, i (i)}
						<Card class="flex flex-col items-center justify-center space-y-4 p-4 transition">
							<img class="h-16 w-16" src={icon} alt={name} />
							<CardTitle class="text-center">{name}</CardTitle>
							<CardContent class="flex flex-row flex-wrap items-center justify-center space-x-1">
								<CardDescription class="text-center">Proficiency</CardDescription>
								{#each Array(level).fill(0) as _, i (i)}
									<!-- responsive stars that asjust size based on screen size -->
									<Star class="h-4 w-4 md:h-6 md:w-6" fill="currentColor" />
								{/each}
							</CardContent>
						</Card>
					{/each}
				</div>
			</section>
		</div>
		<hr class="mx-20 my-6 border-2" />
		<section class="w-full py-12 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<h2
							class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-primary"
						>
							Tooling
						</h2>
						<p
							class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							These are the frameworks I am proficient in.
						</p>
					</div>
				</div>
				<div class="mx-auto max-w-5xl py-12">
					<div class="relative">
						<div class="absolute left-0 top-0 h-full w-1 bg-muted-foreground"></div>
						<div class="flex flex-col space-y-12 md:space-y-24">
							{#each tooling as { name, description, icon }, i (i)}
								<div class="flex items-start space-x-4">
									<div class="relative">
										<!-- circle stoppoint  -->
										<div
											class="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform rounded-full bg-primary"
										></div>
									</div>
									<Card
										class="max-w-[30rem] flex-grow overflow-hidden rounded-lg border text-card-foreground shadow-lg dark:bg-slate-800"
										data-v0-t="card"
									>
										<div class="flex flex-col space-y-1.5 p-6">
											<img src={icon} alt="something" class="h-20 w-20" />
										</div>
										<CardContent class="p-6">
											<CardTitle class="whitespace-nowrap text-2xl font-bold">{name}</CardTitle>
											<CardDescription class="text-sm text-muted-foreground">
												{description}
											</CardDescription>
										</CardContent>
									</Card>
								</div>
								<!-- cut off point  -->
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>
