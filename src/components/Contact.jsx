/**
 * Contact Section Component
 * Contact information and social links
 */

import { motion as Motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiExternalLink,
} from "react-icons/fi";
import { SiFreecodecamp } from "react-icons/si";
import { Section } from "./ui/Container";
import { useGitHubUser } from "../hooks";

export const Contact = () => {
  const { data: user } = useGitHubUser();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const contactMethods = [
    {
      icon: FiMail,
      label: "Email",
      value: user?.email || "mayenakech1@gmail.com",
      href: `mailto:${user?.email || "mayenakech1@gmail.com"}`,
      color: "text-red-500",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "@Mayen007",
      href: "https://github.com/Mayen007",
      color: "text-gray-700 dark:text-gray-300",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "Mayen Akech",
      href: "https://linkedin.com/in/mayen-akech",
      color: "text-blue-600",
    },
    {
      icon: SiFreecodecamp,
      label: "freeCodeCamp",
      value: "@Mayen007",
      href: "https://www.freecodecamp.org/Mayen007",
      color: "text-green-600",
    },
  ];

  return (
    <Section id="contact" className="bg-gray-50 dark:bg-gray-800/50">
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
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            I'm always interested in hearing about new projects and
            opportunities. Let's connect!
          </p>
        </Motion.div>

        {/* Contact Cards Grid */}
        <Motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                variants={itemVariants}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${method.color} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {method.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 truncate">
                      {method.value}
                    </p>
                  </div>
                  <FiExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                </div>
              </Motion.a>
            );
          })}
        </Motion.div>

        {/* Location Info */}
        {user?.location && (
          <Motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiMapPin className="w-5 h-5" />
              <span className="text-base sm:text-lg">
                Based in{" "}
                <strong className="text-gray-900 dark:text-white">
                  {user.location}
                </strong>
              </span>
            </div>
          </Motion.div>
        )}

        {/* Additional Info */}
        <Motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            Prefer something else? Find me on other platforms:
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { name: "GitHub", href: "https://github.com/Mayen007" },
              { name: "LinkedIn", href: "https://linkedin.com/in/mayen-akech" },
              {
                name: "freeCodeCamp",
                href: "https://www.freecodecamp.org/Mayen007",
              },
            ].map((platform, index) => (
              <Motion.a
                key={index}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors border border-gray-200 dark:border-gray-700 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {platform.name}
              </Motion.a>
            ))}
          </div>
        </Motion.div>
      </Motion.div>
    </Section>
  );
};
