/**
 * Card Component
 * Flexible card container with hover effects
 */

import { motion } from "framer-motion";

/**
 * Card with glass-morphism effect and hover animations
 * Perfect for project cards, profile cards, etc.
 */
export const Card = ({
  children,
  className = "",
  hover = true,
  animate = true,
  ...props
}) => {
  const baseStyles = "rounded-xl p-6 transition-all duration-300";
  const glassStyles =
    "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700";
  const hoverStyles = hover ? "hover:shadow-2xl hover:-translate-y-1" : "";

  const Component = animate ? motion.div : "div";
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Component
      {...animationProps}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
