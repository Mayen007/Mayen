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

          <div className="w-full">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme={isDark ? "dark" : "light"}
              theme={calendarTheme}
              blockSize={10}
              blockMargin={3}
              fontSize={12}
              style={{
                width: "100%",
              }}
            />
          </div>

          {/* Calendar Legend/Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  {calendarTheme[isDark ? "dark" : "light"].map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
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

        {/* Call to Action */}
        <Motion.div
          variants={itemVariants}
          className="text-center mt-8 sm:mt-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 sm:p-8 lg:p-12 text-white"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Let's Collaborate!
          </h3>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects. Feel
            free to reach out if you'd like to work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get in Touch</span>
            </Motion.a>
            <Motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Follow on GitHub</span>
            </Motion.a>
          </div>
        </Motion.div>
      </Motion.div>
    </Section>
  );
};
