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
    <Section id="about" className="bg-gray-50 dark:bg-gray-800/50">
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
            Passionate about building innovative solutions and learning new
            technologies
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Bio Card */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              My Story
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {user?.bio ||
                "I'm a passionate Full-Stack Developer based in Nairobi, Kenya. I love crafting code by day and breaking it by night, building the web one bug fix at a time."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With a strong focus on modern web technologies and best practices,
              I create responsive, user-friendly applications that solve
              real-world problems.
            </p>
          </Motion.div>

          {/* Info Card */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8"
        >
              {[
            { label: "Projects", value: user?.public_repos || 0 },
            { label: "Gists", value: user?.public_gists || 0 },
            { label: "Followers", value: user?.followers || 0 },
            { label: "Following", value: user?.following || 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center"
            >
              <div className="text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </Motion.div>
      </Motion.div>
    </Section>
  );
};
