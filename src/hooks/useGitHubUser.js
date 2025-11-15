/**
 * useGitHubUser Hook
 * Fetches GitHub user profile data with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { octokit, GITHUB_USERNAME, handleGitHubError } from '../lib/github';
import { getCachedData, setCachedData } from '../utils/cache';

const CACHE_KEY = 'github_user';

/**
 * Fetch user profile from GitHub API
 * Includes: name, bio, avatar, location, followers, repos, etc.
 */
const fetchGitHubUser = async () => {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username: GITHUB_USERNAME,
    });

    // Cache the result
    setCachedData(CACHE_KEY, data);

    return data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);

    // Try to return cached data on error
    const cached = getCachedData(CACHE_KEY);
    if (cached) {
      console.log('Returning cached user data');
      return cached;
    }

    throw new Error(handleGitHubError(error));
  }
};

/**
 * Custom hook to fetch and cache GitHub user data
 * Automatically handles loading, error, and cached states
 */
export const useGitHubUser = () => {
  return useQuery({
    queryKey: ['github-user', GITHUB_USERNAME],
    queryFn: fetchGitHubUser,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
