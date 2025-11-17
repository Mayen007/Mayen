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
  FiPhone,
} from "react-icons/fi";
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
      value: user?.email || "mayenakech9@gmail.com",
      href: `mailto:${user?.email || "mayenakech9@gmail.com"}`,
      color: "text-red-500",
    },
    {
      icon: FiPhone,
      label: "Phone",
      // don't display the number publicly — prompt users to request it via email
      value: "Available on request",
      href: `mailto:${
        user?.email || "mayenakech9@gmail.com"
      }?subject=Phone%20Number%20Request&body=Hi%20Mayen,%0A%0APlease%20share%20your%20phone%20number%20so%20we%20can%20connect.`,
      color: "text-green-500 dark:text-green-400",
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
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <Section id="contact" className="bg-gray-50 dark:bg-gray-800/50">
      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
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
      </Motion.div>
    </Section>
  );
};
