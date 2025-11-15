/**
 * useGitHubRepos Hook
 * Fetches all public repositories with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { octokit, GITHUB_USERNAME, handleGitHubError } from '../lib/github';
import { getCachedData, setCachedData } from '../utils/cache';

const CACHE_KEY = 'github_repos';

/**
 * Fetch all public repositories from GitHub API
 * Sorted by last updated, includes stars, forks, languages, etc.
 */
const fetchGitHubRepos = async () => {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: GITHUB_USERNAME,
      sort: 'updated',
      per_page: 100,
      type: 'owner',
    });

    // Filter out forked repos (optional)
    const ownRepos = data.filter(repo => !repo.fork);

    // Cache the result
    setCachedData(CACHE_KEY, ownRepos);

    return ownRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);

    // Try to return cached data on error
    const cached = getCachedData(CACHE_KEY);
    if (cached) {
      console.log('Returning cached repos data');
      return cached;
    }

    throw new Error(handleGitHubError(error));
  }
};

/**
 * Custom hook to fetch and cache GitHub repositories
 * Returns sorted list of public repositories
 */
export const useGitHubRepos = () => {
  return useQuery({
    queryKey: ['github-repos', GITHUB_USERNAME],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
};

/**
 * Get top N repositories by stars
 */
export const useTopRepos = (limit = 6) => {
  const { data, ...rest } = useGitHubRepos();

  const topRepos = data
    ? [...data]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
    : [];

  return {
    data: topRepos,
    ...rest,
  };
};

/**
 * Get featured repositories by name
 * Useful for showcasing specific projects
 */
export const useFeaturedRepos = (repoNames = []) => {
  const { data, ...rest } = useGitHubRepos();

  const featuredRepos = data
    ? data.filter(repo =>
      repoNames.some(name =>
        repo.name.toLowerCase() === name.toLowerCase()
      )
    )
    : [];

  return {
    data: featuredRepos,
    ...rest,
  };
};
