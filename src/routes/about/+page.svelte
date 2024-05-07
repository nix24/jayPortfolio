<script lang="ts">
	import c from '$lib/static/c.svg';
	import java from '$lib/static/java.svg';
	import typescript from '$lib/static/typescript.svg';
	import python from '$lib/static/python.svg';
	import rust from '$lib/static/rust.svg';

	import Git from '$lib/static/Git.svg';
	import Github from '$lib/static/github.svg';

	import mongodb from '$lib/static/mongodb.svg';
	import mysql from '$lib/static/mysql.svg';

	import { Badge } from '$lib/components/ui/badge';
	import { CardTitle, CardContent, Card, CardDescription } from '$lib/components/ui/card';
	import { Star } from 'lucide-svelte';

	import jSelfie2 from '$lib/static/jaySelfie2.webp';
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let isAnimate = false;

	onMount(() => {
		isAnimate = true;
	});

	// using badges to list out, Adaptable, problem-Solver, Strong-Fundementals, Team-Leader, Efficient, Fast-Learner
	const skills = [
		'Adaptable',
		'Problem-Solver',
		'Strong-Fundamentals',
		'Team-Leader',
		'Efficient',
		'Fast-Learner'
	];

	const languages = [
		{ name: 'Typescript', icon: typescript, level: 5 },
		{ name: 'Rust', icon: rust, level: 4 },
		{ name: 'Java', icon: java, level: 4 },
		{ name: 'Python', icon: python, level: 3 },
		{ name: 'C++', icon: c, level: 3 }
	];

	const tooling = [
		{
			name: 'Git',
			description: 'A distributed version control system.',
			icon: Git
		},
		{
			name: 'Github',
			description: 'A web-based platform for version control using Git.',
			icon: Github
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
		},
		{
			name: 'AWS',
			description:
				'A secure cloud services platform, offering computing power, database storage, content delivery and other functionality to help businesses scale and grow.',
			icon: 'https://img.icons8.com/color/452/amazon-web-services.png'
		}
	];

	//breakpoint: 1760, 1998, 2291, 2590
</script>

<main class=" font-sans leading-normal tracking-normal">
	<div class="container mx-auto my-10 p-8">
		<div class="grid grid-cols-1 md:grid-cols-12">
			<div class="p-6 md:col-span-7">
				<h1 class="mb-4 text-6xl font-bold">So who am I anyways?</h1>
				<section class="flex flex-col space-y-4">
					<p>
						I am a recent graduate from the University of North Carolina at Charlotte, where I
						earned my degree in Computer Science. Throughout my academic journey, I have developed a
						strong passion for software engineering, with a particular focus on backend development.
					</p>
					<p>
						My coursework and hands-on experience have equipped me with a solid foundation in
						working with and creating HTTP servers, working with noSql and Sql databases and a deep
						understanding of data-structures.
					</p>
					<p>
						I have also had the opportunity to work on frontend projects. As I embark on my
						professional career, I am excited to contribute my skills and knowledge to a dynamic and
						innovative software engineering team. I am currently seeking opportunities that will
						allow me to further develop my expertise in backend technologies while collaborating to
						create robust and efficient software solutions.
					</p>
				</section>

				<hr class="mx-20 my-6 border-2" />

				<section class="mb-5">
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
				</section>
			</div>
			<div class="p-6 md:col-span-5">
				<img
					in:fly={{ y: 1000, delay: 500, duration: 1000 }}
					class="rounded-lg"
					src={jSelfie2}
					alt="guy_placeholder"
				/>
			</div>
			<!-- langauges. level is determined by circles with a bg-primary color  -->
			<!-- modern and clean design but creative in showing off my skills -->
			<hr class="mx-20 my-6 border-2" />

			<section class="p-6 md:col-span-10">
				<div class="mb-5 space-y-2">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Languages</h2>
					<p
						class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						I am proficient in these languages
					</p>
				</div>
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
						<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tooling</h2>
						<p
							class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							I am proficient in these frameworks
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
