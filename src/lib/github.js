/**
 * GitHub API Configuration
 * Initializes Octokit client for GitHub API interactions
 */

import { Octokit } from 'octokit';

// GitHub configuration constants
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Mayen007';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN?.trim();
export const hasGitHubToken = Boolean(GITHUB_TOKEN);

const unauthenticatedOctokit = new Octokit({
  userAgent: 'Mayen-Portfolio/1.0.0',
});

const authenticatedOctokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'Mayen-Portfolio/1.0.0',
});

let canUseAuthenticatedRequests = hasGitHubToken;

// Initialize Octokit client with authentication
export const octokit = hasGitHubToken ? authenticatedOctokit : unauthenticatedOctokit;

export const hasUsableGitHubAuth = () => canUseAuthenticatedRequests;

/**
 * Whether an error is caused by missing/invalid GitHub credentials
 */
export const isGitHubAuthError = (error) => {
  return error?.status === 401 ||
    error?.message?.toLowerCase?.().includes('bad credentials');
};

/**
 * Run a REST request and automatically retry without auth if token is invalid
 */
export const withOctokitFallback = async (operation) => {
  const primaryClient = canUseAuthenticatedRequests ? authenticatedOctokit : unauthenticatedOctokit;

  try {
    return await operation(primaryClient);
  } catch (error) {
    if (!canUseAuthenticatedRequests || !isGitHubAuthError(error)) {
      throw error;
    }

    canUseAuthenticatedRequests = false;
    return operation(unauthenticatedOctokit);
  }
};

/**
 * Execute GraphQL query only when auth is usable; disable auth mode on 401.
 */
export const withGraphQLFallback = async (operation, fallbackValue = null) => {
  if (!canUseAuthenticatedRequests) {
    return fallbackValue;
  }

  try {
    return await operation(authenticatedOctokit);
  } catch (error) {
    if (!isGitHubAuthError(error)) {
      throw error;
    }

    canUseAuthenticatedRequests = false;
    return fallbackValue;
  }
};

/**
 * Check GitHub API rate limit status
 * Useful for monitoring API usage
 */
export const checkRateLimit = async () => {
  try {
    const { data } = await octokit.rest.rateLimit.get();
    return {
      remaining: data.rate.remaining,
      limit: data.rate.limit,
      reset: new Date(data.rate.reset * 1000),
    };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
};

/**
 * GitHub API error handler
 * Provides user-friendly error messages
 */
export const handleGitHubError = (error) => {
  // Network errors (offline, timeout, DNS issues)
  if (error.message?.includes('fetch') ||
    error.message?.includes('Network') ||
    error.message?.includes('Failed to fetch')) {
    return 'Network error. Using cached data.';
  }

  if (error.status === 403) {
    return 'API rate limit exceeded. Please try again later.';
  }
  if (error.status === 404) {
    return 'Resource not found. Please check the URL.';
  }
  if (error.status === 401) {
    return 'Authentication failed. Check your GitHub token or remove it to use public API data.';
  }
  return 'An error occurred while fetching data from GitHub.';
};
