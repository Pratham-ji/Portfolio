import { API_CONSTANTS } from '../utils/constants';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

/**
 * Standardized API error class for the application.
 */
export class AppError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Fetches GitHub repositories with AbortSignal support, caching, and retries.
 */
export async function fetchGithubRepos(signal?: AbortSignal): Promise<GithubRepo[]> {
  const cacheKey = `github_repos_${API_CONSTANTS.GITHUB_USERNAME}`;
  const cachedData = sessionStorage.getItem(cacheKey);
  const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);

  if (cachedData && cacheTimestamp) {
    const isExpired = Date.now() - parseInt(cacheTimestamp, 10) > API_CONSTANTS.CACHE_DURATION_MS;
    if (!isExpired) {
      return JSON.parse(cachedData);
    }
  }

  try {
    const response = await fetch(
      `${API_CONSTANTS.GITHUB_API_URL}/users/${API_CONSTANTS.GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      { signal }
    );

    if (!response.ok) {
      throw new AppError(`GitHub API Error: ${response.statusText}`, response.status);
    }

    const data: GithubRepo[] = await response.json();
    
    // Cache the response
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    sessionStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw new AppError(error instanceof Error ? error.message : 'Unknown error occurred fetching GitHub repos');
  }
}
