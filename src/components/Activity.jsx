/**
 * Activity Section Component
 * GitHub contribution calendar and recent activity
 */

import { motion as Motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Section } from "./ui/Container";
import { useTheme } from "../hooks/useTheme";
import { GITHUB_USERNAME } from "../lib/github";

export const Activity = () => {
  const { isDark } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Custom theme for the calendar
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <Section id="activity">
      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <Motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">GitHub Activity</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            A visual representation of my coding activity and contributions over
            the past year.
          </p>
        </Motion.div>

        {/* Contribution Calendar */}
        <Motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Contribution Calendar
          </h3>

          <div className="w-full flex justify-center">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme={isDark ? "dark" : "light"}
              theme={calendarTheme}
              blockSize={10}
              blockMargin={3}
              fontSize={12}
              showTotalCount={true}
              style={{
                width: "100%",
              }}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end text-sm text-gray-600 dark:text-gray-400">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                View full profile on GitHub →
              </a>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </Section>
  );
};
