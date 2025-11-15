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

    // If no pinned repos, fall back to top repos by stars
    if (pinnedRepos.length === 0) {
      const { data: repos } = await octokit.rest.repos.listForUser({
        username: GITHUB_USERNAME,
        sort: 'updated',
        per_page: 6,
      });

      const filteredRepos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      const transformedRepos = filteredRepos.map(repo => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepageUrl: repo.homepage,
        stargazerCount: repo.stargazers_count,
        forkCount: repo.forks_count,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        primaryLanguage: repo.language ? {
          name: repo.language,
          color: '#000000',
        } : null,
        languages: repo.language ? [{ name: repo.language, color: '#000000' }] : [],
        openGraphImageUrl: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        topics: repo.topics || [],
      }));

      setCachedData(CACHE_KEY, transformedRepos);
      return transformedRepos;
    }

    // Transform data for use in ProjectCard component
    const transformedRepos = pinnedRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
      primaryLanguage: repo.primaryLanguage ? {
        name: repo.primaryLanguage.name,
        color: repo.primaryLanguage.color,
      } : null,
      languages: repo.languages?.nodes || [],
      openGraphImageUrl: repo.openGraphImageUrl,
      topics: repo.repositoryTopics?.nodes?.map(t => t.topic.name) || [],
    }));

    // Cache the result
    setCachedData(CACHE_KEY, transformedRepos);

    return transformedRepos;
  } catch (error) {
    // Try to return cached data on error
    const cached = getCachedData(CACHE_KEY);
    if (cached) {
      return cached;
    }

    // Only log non-network errors
    if (!error.message?.includes('fetch') && !error.message?.includes('Network')) {
      console.error('Error fetching pinned repos:', error);
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
