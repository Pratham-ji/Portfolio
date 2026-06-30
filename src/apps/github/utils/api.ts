// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface GithubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

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

const getCachedData = <T>(url: string): T | null => {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
};

const performFetch = async <T>(url: string, timeout: number): Promise<T> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data as T;
};

const handleError = <T>(error: unknown, url: string, retries: number, timeout: number): Promise<T> => {
  const isAbort = error instanceof Error && error.name === 'AbortError';
  if (isAbort) {
    if (retries > 0) return fetchWithTimeoutAndRetry<T>(url, retries - 1, timeout);
    throw new Error('Request timed out. Please try again.', { cause: error });
  }
  if (retries > 0 && navigator.onLine) {
    return fetchWithTimeoutAndRetry<T>(url, retries - 1, timeout);
  }
  throw error;
};

const fetchWithTimeoutAndRetry = async <T>(url: string, retries = 3, timeout = 5000): Promise<T> => {
  if (!navigator.onLine) {
    throw new Error('You are currently offline. Please check your internet connection.');
  }

  const cachedData = getCachedData<T>(url);
  if (cachedData) return cachedData;

  try {
    return await performFetch<T>(url, timeout);
  } catch (error: unknown) {
    return handleError<T>(error, url, retries, timeout);
  }
};

export const fetchGithubProfile = async (username: string): Promise<GithubProfile> => {
  return fetchWithTimeoutAndRetry<GithubProfile>(`https://api.github.com/users/${username}`);
};

export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  return fetchWithTimeoutAndRetry<GithubRepo[]>(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
};
