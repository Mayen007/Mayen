/**
 * useGitHubStats Hook
 * Fetches GitHub user statistics and contribution data
 */

import { useQuery } from '@tanstack/react-query';
import { octokit, GITHUB_USERNAME, handleGitHubError } from '../lib/github';
import { getCachedData, setCachedData } from '../utils/cache';

const CACHE_KEY = 'github_stats';

/**
 * Fetch comprehensive GitHub statistics
 */
const fetchGitHubStats = async () => {
  try {
    // Fetch user data
    const { data: user } = await octokit.rest.users.getByUsername({
      username: GITHUB_USERNAME,
    });

    // Fetch all repositories to calculate total stars and forks
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: GITHUB_USERNAME,
      per_page: 100,
      sort: 'updated',
    });

    // Calculate total stars and forks
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Fetch contribution data for the current year
    const currentYear = new Date().getFullYear();
    const contributionQuery = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection(from: "${currentYear}-01-01T00:00:00Z") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
            contributionYears
          }
        }
      }
    `;

    const contributionData = await octokit.graphql(contributionQuery);
    const calendar = contributionData.user.contributionsCollection.contributionCalendar;

    // Calculate streaks
    const days = calendar.weeks.flatMap(week => week.contributionDays);
    const { currentStreak, longestStreak } = calculateStreaks(days);

    const stats = {
      totalContributions: calendar.totalContributions,
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      currentStreak,
      longestStreak,
      contributionYears: contributionData.user.contributionsCollection.contributionYears,
    };

    // Cache the result
    setCachedData(CACHE_KEY, stats);

    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    // Try to return cached data on error
    const cached = getCachedData(CACHE_KEY);
    if (cached) {
      console.log('Returning cached stats data');
      return cached;
    }

    throw new Error(handleGitHubError(error));
  }
};

/**
 * Calculate current and longest contribution streaks
 */
const calculateStreaks = (days) => {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Sort days in reverse (most recent first)
  const sortedDays = [...days].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate current streak (from today backwards)
  const today = new Date().toISOString().split('T')[0];
  let checkingCurrent = true;

  for (const day of sortedDays) {
    if (checkingCurrent) {
      if (day.contributionCount > 0 || day.date === today) {
        currentStreak++;
        if (day.contributionCount === 0) checkingCurrent = false;
      } else {
        checkingCurrent = false;
      }
    }

    // Calculate longest streak
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
};

/**
 * Custom hook to fetch GitHub statistics
 */
export const useGitHubStats = () => {
  return useQuery({
    queryKey: ['github-stats', GITHUB_USERNAME],
    queryFn: fetchGitHubStats,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
