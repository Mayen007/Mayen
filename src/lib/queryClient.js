/**
 * React Query Configuration
 * Sets up global query client with caching and retry strategies
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Configure React Query client with optimized settings
 * - Cache data for 10 minutes (staleTime)
 * - Keep unused data for 15 minutes (gcTime)
 * - Retry failed requests once
 * - Don't refetch on window focus to save API calls
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, // Retry when network reconnects
      retry: (failureCount, error) => {
        // Don't retry network errors - use cache instead
        if (error.message?.includes('fetch') ||
          error.message?.includes('Network')) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
