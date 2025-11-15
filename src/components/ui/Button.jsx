/**
 * Button Component
 * Reusable button with variants and sizes
 */

import { motion as Motion } from "framer-motion";

/**
 * Button variants:
 * - primary: Main action button with gradient
 * - secondary: Secondary action with outline
 * - ghost: Minimal styling for subtle actions
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-purple-600 text-white hover:from-primary-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary:
      "border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20",
    ghost:
      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Motion.button>
  );
};
