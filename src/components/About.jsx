/**
 * About Section Component
 * Professional bio and information from GitHub
 */

import { motion as Motion } from "framer-motion";
import { FiMapPin, FiMail, FiCalendar, FiLink } from "react-icons/fi";
import { useGitHubUser } from "../hooks";
import { Section } from "./ui/Container";
import { Loading } from "./ui/Loading";

export const About = () => {
  const { data: user, isLoading } = useGitHubUser();

  if (isLoading) {
    return (
      <Section id="about" className="bg-gray-50 dark:bg-gray-800/50">
        <Loading message="Loading about info..." />
      </Section>
    );
  }

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <Section
      id="about"
      className="bg-gray-50 dark:bg-gray-800/50 overflow-hidden"
    >
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Frontend-focused developer building fast, accessible interfaces
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-0">
          {/* Bio Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              My Story
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">
                  Who I Am
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a Full-Stack Developer based in Nairobi, Kenya, working
                  toward a BSc in Information Technology at Mount Kenya
                  University (2027). My focus is frontend engineering — building
                  interfaces that are fast, accessible, and genuinely pleasant
                  to use.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">
                  What I Build
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I work primarily in React, with a strong handle on the backend
                  systems that power it — REST APIs, MongoDB, and Node.js.
                  Recent work includes a community platform for MKUSSSA and a
                  developer job-tracking system tailored for the Kenyan market.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-2">
                  Current Focus
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I care about the details — component architecture, UI
                  consistency, and interfaces built around how people actually
                  use them. Currently deepening my knowledge of performance
                  optimization and modern design systems.
                </p>
              </div>
            </div>
          </Motion.div>

          {/* Info Card */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Quick Info
            </h3>
            <div className="space-y-4">
              {user?.location && (
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {user.location}
                    </p>
                  </div>
                </div>
              )}

              {user?.email && (
                <div className="flex items-start gap-3">
                  <FiMail className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary-500 transition-colors"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
              )}

              {user?.blog && (
                <div className="flex items-start gap-3">
                  <FiLink className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Website
                    </p>
                    <a
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary-500 transition-colors"
                    >
                      {user.blog}
                    </a>
                  </div>
                </div>
              )}

              {joinDate && (
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      GitHub Member Since
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {joinDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Motion.div>
        </div>

        {/* Stats Cards */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-8"
        >
          {[
            { label: "Projects", value: user?.public_repos || 0 },
            { label: "Gists", value: user?.public_gists || 0 },
            { label: "Followers", value: user?.followers || 0 },
            { label: "Following", value: user?.following || 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow text-center"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </Motion.div>

        {/* Resume Download */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Motion.a
            href="/Mayen Akech Resume.pdf"
            download="Mayen Akech Resume.pdf"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </Motion.a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            PDF format • Updated March 2026
          </p>
        </Motion.div>
      </Motion.div>
    </Section>
  );
};
