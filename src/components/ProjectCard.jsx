/**
 * ProjectCard Component
 * Individual project card with GitHub repo data
 */

import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiStar,
  FiGitBranch,
  FiChevronDown,
} from "react-icons/fi";

export const ProjectCard = ({ project, index }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Lazy load image with delay to avoid loading every card at once.
  useEffect(() => {
    const preferredImage = project.screenshotUrl;
    if (!preferredImage) return;

    // Stagger image loading: 500ms delay per card
    const delay = index * 500;
    const timer = setTimeout(() => {
      setImageSrc(preferredImage);
    }, delay);

    return () => clearTimeout(timer);
  }, [project.screenshotUrl, index]);

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
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full border-2 border-gray-200/80 dark:border-zinc-800 hover:border-blue-500/50"
    >
      {/* Project Image/Thumbnail Container */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-zinc-950">
        {imageSrc && !imageError ? (
          <img
            src={imageSrc}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900">
            <FiGithub className="w-16 h-16 text-zinc-700" />
          </div>
        )}

        {/* Studio Index Badge (01, 02, 03...) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 font-mono font-black text-xs text-blue-400 bg-zinc-950/90 border border-blue-500/40 rounded-lg backdrop-blur-md shadow-lg">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Language Badge */}
        {project.primaryLanguage && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md backdrop-blur-md"
              style={{
                backgroundColor: project.primaryLanguage.color || "#2563eb",
              }}
            >
              {project.primaryLanguage.name}
            </span>
          </div>
        )}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-zinc-300 mb-4 line-clamp-2 leading-relaxed flex-grow font-normal">
          {project.description || "No description available"}
        </p>

        {/* Problem / Solution / Outcome Expandable */}
        {project.details && (
          <div className="mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              aria-expanded={expanded}
            >
              <span>{expanded ? "COLLAPSE CASE" : "VIEW CASE DETAILS"}</span>
              <Motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4" />
              </Motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <Motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 text-xs text-gray-600 dark:text-zinc-400 border-l-2 border-blue-500/50 pl-3 leading-relaxed">
                    <p>
                      <strong className="font-bold text-gray-900 dark:text-zinc-200">
                        Problem:{" "}
                      </strong>
                      {project.details.problem}
                    </p>
                    <p>
                      <strong className="font-bold text-gray-900 dark:text-zinc-200">
                        Solution:{" "}
                      </strong>
                      {project.details.solution}
                    </p>
                    <p>
                      <strong className="font-bold text-gray-900 dark:text-zinc-200">
                        Outcome:{" "}
                      </strong>
                      {project.details.outcome}
                    </p>
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Topics/Tags */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300"
              >
                #{topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400">
                +{project.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs font-mono text-gray-500 dark:text-zinc-400 font-semibold">
          <div className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5 text-blue-500" />
            <span>{project.stargazerCount || 0} STARS</span>
          </div>
          <div className="flex items-center gap-1">
            <FiGitBranch className="w-3.5 h-3.5" />
            <span>{project.forkCount || 0} FORKS</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex gap-2.5 pt-3 border-t border-gray-200/70 dark:border-zinc-800 mt-auto">
          <Motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl hover:bg-gray-800 dark:hover:bg-white transition-colors font-mono font-bold text-xs uppercase tracking-wider"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiGithub className="w-4 h-4" />
            <span>CODE</span>
          </Motion.a>

          {project.homepageUrl && (
            <Motion.a
              href={project.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/30 transition-colors font-mono font-bold text-xs uppercase tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiExternalLink className="w-4 h-4" />
              <span>DEMO</span>
            </Motion.a>
          )}
        </div>
      </div>
    </Motion.article>
  );
};
