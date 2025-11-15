/**
 * ErrorMessage Component
 * Displays error states with retry option
 */

import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { Button } from "./Button";

/**
 * Error display with optional retry button
 * Shows user-friendly error messages
 */
export const ErrorMessage = ({
  message = "Something went wrong",
  onRetry,
  fullScreen = false,
}) => {
  const content = (
    <div className="text-center">
      <FiAlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Oops! An Error Occurred
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          <FiRefreshCw className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        {content}
      </div>
    );
  }

  return <div className="py-12 px-4">{content}</div>;
};
