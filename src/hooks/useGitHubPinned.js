/**
 * useGitHubPinned Hook
 * Fetches pinned repositories using GitHub GraphQL API
 */

import { useQuery } from '@tanstack/react-query';
import { octokit, GITHUB_USERNAME, handleGitHubError } from '../lib/github';
import { getCachedData, setCachedData } from '../utils/cache';

const CACHE_KEY = 'github_pinned';

/**
 * GraphQL query to fetch pinned repositories
 * Includes: name, description, stars, forks, languages, homepage, etc.
 */
const PINNED_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            createdAt
            updatedAt
            primaryLanguage {
              name
              color
            }
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
                color
              }
            }
            openGraphImageUrl
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch pinned repositories from GitHub GraphQL API
 * These are the repos pinned on the user's GitHub profile
 */
const fetchGitHubPinned = async () => {
  try {
    const response = await octokit.graphql(PINNED_REPOS_QUERY, {
      username: GITHUB_USERNAME,
    });

    const pinnedRepos = response.user?.pinnedItems?.nodes || [];

    // Transform data to match REST API structure for consistency
    const transformedRepos = pinnedRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      created_at: repo.createdAt,
      updated_at: repo.updatedAt,
      language: repo.primaryLanguage?.name,
      language_color: repo.primaryLanguage?.color,
      languages: repo.languages?.nodes || [],
      open_graph_image_url: repo.openGraphImageUrl,
      topics: repo.repositoryTopics?.nodes?.map(t => t.topic.name) || [],
    }));

    // Cache the result
    setCachedData(CACHE_KEY, transformedRepos);

    return transformedRepos;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);

    // Try to return cached data on error
    const cached = getCachedData(CACHE_KEY);
    if (cached) {
      console.log('Returning cached pinned repos data');
      return cached;
    }

    throw new Error(handleGitHubError(error));
  }
};

/**
 * Custom hook to fetch pinned repositories from GitHub profile
 * Uses GraphQL API for better data structure
 */
export const useGitHubPinned = () => {
  return useQuery({
    queryKey: ['github-pinned', GITHUB_USERNAME],
    queryFn: fetchGitHubPinned,
    staleTime: 1000 * 60 * 30, // 30 minutes (pinned repos rarely change)
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
};
