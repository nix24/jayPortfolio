import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const GITHUB_USERNAME = 'nix24';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const endpoint = url.searchParams.get('endpoint') || 'repos';

		let apiUrl: string;

		switch (endpoint) {
			case 'repos':
				// Fetch repositories sorted by updated date, limited to 12 most recent
				apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=public`;
				break;
			case 'user':
				// Fetch user profile information
				apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
				break;
			default:
				return json({ error: 'Invalid endpoint' }, { status: 400 });
		}

		const response = await fetch(apiUrl, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'jay-portfolio-app'
			}
		});

		if (!response.ok) {
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const data = await response.json();

		// If fetching repos, filter and enhance the data
		if (endpoint === 'repos') {
			const enhancedRepos = data
				.filter((repo: any) => !repo.fork && !repo.archived) // Filter out forks and archived repos
				.map((repo: any) => ({
					id: repo.id,
					name: repo.name,
					full_name: repo.full_name,
					description: repo.description,
					html_url: repo.html_url,
					homepage: repo.homepage,
					language: repo.language,
					stargazers_count: repo.stargazers_count,
					forks_count: repo.forks_count,
					open_issues_count: repo.open_issues_count,
					created_at: repo.created_at,
					updated_at: repo.updated_at,
					pushed_at: repo.pushed_at,
					topics: repo.topics || [],
					visibility: repo.visibility,
					default_branch: repo.default_branch,
					size: repo.size
				}))
				.sort((a: any, b: any) => {
					// Sort by stars first, then by update date
					if (a.stargazers_count !== b.stargazers_count) {
						return b.stargazers_count - a.stargazers_count;
					}
					return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
				});

			return json(enhancedRepos);
		}

		return json(data);
	} catch (error) {
		console.error('GitHub API Error:', error);
		return json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
	}
};
