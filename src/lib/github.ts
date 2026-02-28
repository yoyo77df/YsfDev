export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
            throw new Error(`GitHub API returned ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}

export function getDisplayRepos(repos: GitHubRepo[], pinnedList: string[]): GitHubRepo[] {
    const pinnedRepos: GitHubRepo[] = [];
    const otherRepos: GitHubRepo[] = [];

    // Sort rest by stars desc, then updated desc
    const sortedOthers = [...repos].sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    // Extract pinned repos in order
    for (const pinnedName of pinnedList) {
        const p = sortedOthers.find((r) => r.full_name === pinnedName || r.name === pinnedName);
        if (p) {
            pinnedRepos.push(p);
        }
    }

    // Extract non-pinned repos
    for (const r of sortedOthers) {
        if (!pinnedRepos.find((p) => p.id === r.id)) {
            otherRepos.push(r);
        }
    }

    return [...pinnedRepos, ...otherRepos];
}
