/**
 * Loading Component
 * Displays loading state with spinner
 */

/**
 * Spinner loading indicator
 * Can be used inline or as full-page loader
 */
export const Loading = ({ fullScreen = false, message = "Loading..." }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for content placeholders
 */
export const Skeleton = ({ className = "", count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        />
      ))}
    </>
  );
};
