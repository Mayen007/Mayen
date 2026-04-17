/**
 * useGitHubPinned Hook
 * Fetches pinned repositories using GitHub GraphQL API
 */

import { useQuery } from '@tanstack/react-query';
import {
  GITHUB_USERNAME,
  handleGitHubError,
  isGitHubAuthError,
  withGraphQLFallback,
  withOctokitFallback,
} from '../lib/github';
import { getCachedData, setCachedData } from '../utils/cache';

const CACHE_KEY = 'github_pinned_v2';
const FEATURED_REPOS = (import.meta.env.VITE_GITHUB_FEATURED_REPOS || '')
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean);

const transformRepo = (repo) => ({
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
});

const sortReposByFeaturedOrder = (repos) => {
  const orderMap = new Map(
    FEATURED_REPOS.map((name, index) => [name.toLowerCase(), index])
  );

  return [...repos].sort((repoA, repoB) => {
    const orderA = orderMap.get(repoA.name.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
    const orderB = orderMap.get(repoB.name.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
};

const mergeWithFallbackRepos = (selectedRepos, fallbackRepos) => {
  const selectedNames = new Set(selectedRepos.map((repo) => repo.name.toLowerCase()));
  const mergedRepos = [...selectedRepos];

  for (const repo of fallbackRepos) {
    if (mergedRepos.length >= 6) {
      break;
    }

    if (selectedNames.has(repo.name.toLowerCase())) {
      continue;
    }

    mergedRepos.push(repo);
    selectedNames.add(repo.name.toLowerCase());
  }

  return mergedRepos.slice(0, 6);
};

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
    let pinnedRepos = [];

    // GraphQL requires valid auth; if auth is missing/invalid, fallback to REST below.
    const response = await withGraphQLFallback(
      (client) => client.graphql(PINNED_REPOS_QUERY, {
        username: GITHUB_USERNAME,
      }),
      null
    );

    if (response) {
      pinnedRepos = response.user?.pinnedItems?.nodes || [];
    }

    // If no pinned repos, optionally use manually configured featured repos first.
    if (pinnedRepos.length === 0 && FEATURED_REPOS.length > 0) {
      const { data: repos } = await withOctokitFallback((client) =>
        client.rest.repos.listForUser({
          username: GITHUB_USERNAME,
          sort: 'updated',
          per_page: 100,
          type: 'owner',
        })
      );

      const featuredNameSet = new Set(FEATURED_REPOS.map((name) => name.toLowerCase()));
      const featuredRepos = sortReposByFeaturedOrder(
        repos
          .filter((repo) => !repo.fork && featuredNameSet.has(repo.name.toLowerCase()))
      );

      if (featuredRepos.length > 0) {
        const { data: fallbackData } = await withOctokitFallback((client) =>
          client.rest.search.repos({
            q: `user:${GITHUB_USERNAME} fork:false`,
            sort: 'stars',
            order: 'desc',
            per_page: 6,
          })
        );

        const fallbackRepos = (fallbackData.items || []).filter((repo) => !repo.fork);
        const transformedRepos = mergeWithFallbackRepos(
          featuredRepos,
          fallbackRepos
        ).map(transformRepo);

        setCachedData(CACHE_KEY, transformedRepos);
        return transformedRepos;
      }
    }

    // If no pinned/featured repos, fall back to top repos by stars
    if (pinnedRepos.length === 0) {
      const { data } = await withOctokitFallback((client) =>
        client.rest.search.repos({
          q: `user:${GITHUB_USERNAME} fork:false`,
          sort: 'stars',
          order: 'desc',
          per_page: 6,
        })
      );

      const topStarredRepos = data.items || [];

      const transformedRepos = topStarredRepos.map(transformRepo);

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
    if (
      !error.message?.includes('fetch') &&
      !error.message?.includes('Network') &&
      !isGitHubAuthError(error)
    ) {
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
