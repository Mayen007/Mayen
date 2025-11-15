/**
 * Hero Section Component
 * Animated introduction with GitHub stats and CTA buttons
 */

import { motion as Motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { SiFreecodecamp } from "react-icons/si";
import { Button } from "./ui/Button";
import { useGitHubUser } from "../hooks";

/**
 * Hero component with animated introduction and live GitHub stats
 */
export const Hero = () => {
  const { data: user, isLoading } = useGitHubUser();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Social links
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Mayen007",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/mayenakech",
      icon: FiLinkedin,
    },
    {
      name: "FreeCodeCamp",
      href: "https://freecodecamp.org/Mayen007",
      icon: SiFreecodecamp,
    },
    {
      name: "Email",
      href: "mailto:mayenakech9@gmail.com",
      icon: FiMail,
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <Motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <Motion.div
        className="container-custom relative z-10 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          {user?.avatar_url && (
            <Motion.div variants={itemVariants} className="mb-8">
              <img
                src={user.avatar_url}
                alt={user.name || "Profile"}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-primary-500 shadow-2xl"
              />
            </Motion.div>
          )}

          {/* Greeting */}
          <Motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-2">
              👋 Hello, I'm
            </p>
          </Motion.div>

          {/* Name */}
          <Motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">{user?.name || "Mayen Akech"}</span>
          </Motion.h1>

          {/* Tagline */}
          <Motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-medium"
          >
            Full-Stack Developer
          </Motion.p>

          {/* Bio */}
          <Motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            {user?.bio || "Building Solutions, One Bug Fix at a Time 🚀"}
          </Motion.p>

          {/* Stats */}
          {user && (
            <Motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 mb-12 px-4"
            >
              <div className="text-center min-w-[90px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  {user.public_repos}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Repositories
                </div>
              </div>
              <div className="text-center min-w-[90px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  {user.followers}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Followers
                </div>
              </div>
              <div className="text-center min-w-[90px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  {user.following}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Following
                </div>
              </div>
            </Motion.div>
          )}

          {/* Loading state */}
          {isLoading && (
            <Motion.div variants={itemVariants} className="mb-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-primary-500" />
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading GitHub stats...
              </p>
            </Motion.div>
          )}

          {/* CTA Buttons */}
          <Motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button onClick={() => scrollToSection("#projects")} size="lg">
              View Projects
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              variant="secondary"
              size="lg"
            >
              Get in Touch
            </Button>
          </Motion.div>

          {/* Social Links */}
          <Motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                </Motion.a>
              );
            })}
          </Motion.div>

          {/* Scroll indicator */}
          <Motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <Motion.button
              onClick={() => scrollToSection("#about")}
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <FiArrowDown className="w-6 h-6" />
            </Motion.button>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
};
