/**
 * Projects Section Component
 * Showcase of top GitHub projects with filtering
 */

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Section } from "./ui/Container";
import { ProjectCard } from "./ProjectCard";
import { Loading } from "./ui/Loading";
import { ErrorMessage } from "./ui/ErrorMessage";
import { useGitHubPinned } from "../hooks";

export const Projects = () => {
  const [filter, setFilter] = useState("all");
  const { data: pinnedRepos, isLoading, isError, error } = useGitHubPinned();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Get unique languages for filtering
  const languages = pinnedRepos
    ? [
        "all",
        ...new Set(
          pinnedRepos
            .filter((repo) => repo.primaryLanguage)
            .map((repo) => repo.primaryLanguage.name)
        ),
      ]
    : ["all"];

  // Filter projects
  const filteredProjects = pinnedRepos
    ? filter === "all"
      ? pinnedRepos
      : pinnedRepos.filter((repo) => repo.primaryLanguage?.name === filter)
    : [];

  return (
    <Section id="projects" className="bg-gray-50 dark:bg-gray-800/50">
      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <Motion.div
          variants={headingVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            A collection of my best work, showcasing various technologies and
            problem-solving approaches.
          </p>
        </Motion.div>

        {/* Filter Buttons */}
        {!isLoading && !isError && (
          <Motion.div
            variants={headingVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
          >
            {languages.map((lang) => (
              <Motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-2 sm:px-4 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  filter === lang
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "all" ? "All Projects" : lang}
              </Motion.button>
            ))}
          </Motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex justify-center py-20">
            <ErrorMessage
              message={error?.message || "Failed to load projects"}
            />
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !isError && (
          <>
            {filteredProjects.length > 0 ? (
              <Motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
                variants={containerVariants}
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </Motion.div>
            ) : (
              <Motion.div
                variants={headingVariants}
                className="text-center py-20"
              >
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No projects found for this filter.
                </p>
              </Motion.div>
            )}
          </>
        )}

        {/* View More on GitHub */}
        {!isLoading && !isError && pinnedRepos && pinnedRepos.length > 0 && (
          <Motion.div
            variants={headingVariants}
            className="text-center mt-8 sm:mt-12 px-4"
          >
            <Motion.a
              href="https://github.com/Mayen007?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-xs sm:text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="whitespace-nowrap">
                View All Projects on GitHub
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Motion.a>
          </Motion.div>
        )}
      </Motion.div>
    </Section>
  );
};
