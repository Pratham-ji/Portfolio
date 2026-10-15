export interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | undefined;
  forks_count: number;
  homepage: string | null;
  updated_at: string;
  topics: string[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Fallback / Offline Data if API fails
export const githubFallbackProfile: GithubProfile = {
  name: 'Prathamraj Giri',
  login: 'Pratham-ji',
  avatar_url: 'https://avatars.githubusercontent.com/u/10000000?v=4', // TODO_GITHUB_AVATAR
  html_url: 'https://github.com/Pratham-ji',
  bio: 'Software Engineer',
  public_repos: 42, // TODO_GITHUB_PUBLIC_REPOS
  followers: 100,   // TODO_GITHUB_FOLLOWERS
  following: 50,    // TODO_GITHUB_FOLLOWING
  location: 'India',
  company: null
};

export const githubFallbackRepos: GithubRepo[] = [
  {
    id: 1,
    name: 'Portfolio',
    description: 'A web-based desktop environment simulating a full operating system.',
    html_url: 'https://github.com/Pratham-ji/Portfolio',
    stargazers_count: 5,
    language: 'TypeScript',
    forks_count: 1,
    homepage: 'https://prathame.netlify.app',
    updated_at: new Date().toISOString(),
    topics: ['react', 'typescript', 'portfolio']
  }
];

// Helper to generate a realistic looking (but fake) contribution graph if we cannot hit the GraphQL API.
// We only use this for visual testing; real API should be preferred.
export const generateMockContributionGraph = (): ContributionDay[] => {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Random level for visual effect
    const level = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
    days.push({
      date: d.toISOString().split('T')[0] || '',
      count: level * 3,
      level
    });
  }
  return days;
};
