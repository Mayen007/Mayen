/**
 * GitHub API Configuration
 * Initializes Octokit client for GitHub API interactions
 */

import { Octokit } from 'octokit';

// GitHub configuration constants
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Mayen007';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Initialize Octokit client with authentication
export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'Mayen-Portfolio/1.0.0',
  timeZone: 'Africa/Nairobi',
});

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
  if (error.status === 403) {
    return 'API rate limit exceeded. Please try again later.';
  }
  if (error.status === 404) {
    return 'Resource not found. Please check the URL.';
  }
  if (error.status === 401) {
    return 'Authentication failed. Please check your GitHub token.';
  }
  return 'An error occurred while fetching data from GitHub.';
};
