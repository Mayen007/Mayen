/**
 * Local Storage Utilities
 * Helper functions for caching API data in browser storage
 */

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Get cached data from localStorage
 * Returns null if cache is expired or doesn't exist
 */
export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

/**
 * Save data to localStorage with timestamp
 */
export const setCachedData = (key, data) => {
  try {
    const cacheObject = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Clear specific cache or all cache
 */
export const clearCache = (key = null) => {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      // Clear all github-related cache
      Object.keys(localStorage).forEach((storageKey) => {
        if (storageKey.startsWith('github_')) {
          localStorage.removeItem(storageKey);
        }
      });
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
