/**
 * ProjectCard Component
 * Individual project card with GitHub repo data
 */

import { motion as Motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";

export const ProjectCard = ({ project, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <Motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Project Image/Thumbnail */}
      <div className="relative h-48 sm:h-56 md:h-48 bg-gradient-to-br from-primary-500 to-purple-600 overflow-hidden">
        {project.openGraphImageUrl ? (
          <img
            src={project.openGraphImageUrl}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiGithub className="w-16 h-16 sm:w-20 sm:h-20 text-white/30" />
          </div>
        )}

        {/* Language badge */}
        {project.primaryLanguage && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span
              className="px-2 py-1 sm:px-3 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
              style={{
                backgroundColor: project.primaryLanguage.color || "#333",
              }}
            >
              {project.primaryLanguage.name}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors break-words">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
          {project.description || "No description available"}
        </p>

        {/* Topics/Tags */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium"
              >
                #{topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                +{project.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4" />
            <span>{project.stargazerCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiGitBranch className="w-4 h-4" />
            <span>{project.forkCount || 0}</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiGithub className="w-4 h-4" />
            <span>Code</span>
          </Motion.a>

          {project.homepageUrl && (
            <Motion.a
              href={project.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </Motion.a>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 border-2 border-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Motion.article>
  );
};
