/**
 * Projects Section Component
 * Showcase of curated projects with filtering
 */

import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Section } from "./ui/Container";
import { ProjectCard } from "./ProjectCard";

const PROJECTS = [
  {
    id: "ChangeMakers",
    name: "ChangeMakers",
    description:
      "A community empowerment platform for sustainable development, education, healthcare access, and climate action initiatives.",
    url: "https://github.com/Mayen007/ChangeMakers",
    homepageUrl: "https://changemakers.onrender.com",
    primaryLanguage: { name: "HTML", color: "#E44D26" },
    stargazerCount: 0,
    forkCount: 0,
    topics: [
      "community",
      "non-profit-organisation",
      "NGO",
      "beginner-friendly",
      "web-development",
      "web-design",
    ],
    screenshotUrl: "/project-screenshots/changemakers.png",
  },
  {
    id: "read-it-later",
    name: "read-it-later",
    description:
      "A simple, visual way to save and organize articles you want to read. Built with the MERN stack and works in any modern browser.",
    url: "https://github.com/Mayen007/read-it-later",
    homepageUrl: "https://readitt.netlify.app/",
    primaryLanguage: { name: "JavaScript", color: "#F7DF1E" },
    stargazerCount: 2,
    forkCount: 1,
    topics: ["nodejs", "chrome-extension", "mongodb", "reactjs"],
    screenshotUrl: "/project-screenshots/readitt.png",
  },
  {
    id: "mkusssa",
    name: "MKUSSSA - Nairobi Campus",
    description:
      "A community platform for MKUSSSA, replacing scattered WhatsApp updates with a centralized hub for members, events, and announcements.",
    details: {
      problem:
        "MKU's South Sudanese Students' Association had no formal online presence — membership info, events, and announcements were scattered across WhatsApp threads and word of mouth.",
      solution:
        "Designed and built a full-stack platform with member profiles, event listings, announcements, and an image gallery — handling custom domain setup, Cloudinary image hosting, and Render deployment end-to-end.",
      outcome:
        "A live, centralized hub the association now uses to manage members and communicate, replacing fragmented updates with one accessible source of truth.",
    },
    url: "https://github.com/Mayen007/mkusssa",
    homepageUrl: "https://mkusssa-nairobi.netlify.app/",
    primaryLanguage: { name: "JavaScript", color: "#F7DF1E" },
    stargazerCount: 0,
    forkCount: 0,
    topics: [
      "student-association",
      "mern-stack",
      "modern-ui",
      "responsive-web-design",
    ],
    screenshotUrl: "/project-screenshots/mkusssa.png",
  },
  {
    id: "reviwa",
    name: "reviwa",
    description:
      "A community-driven platform that makes urban waste reporting smarter, more transparent, and trackable.",
    details: {
      problem:
        "Residents had no straightforward way to report waste issues in their area — problems went unnoticed with no visibility for local authorities or community organizers.",
      solution:
        "Built a waste reporting platform where users flag waste by location on an interactive map, track report status, and earn eco-points for participation, with an admin dashboard to manage responses.",
      outcome:
        "Turns waste reporting into something visible and trackable instead of informal complaints, giving residents and admins a shared system to act on.",
    },
    url: "https://github.com/Mayen007/reviwa",
    homepageUrl: "https://reviwa.netlify.app/",
    primaryLanguage: { name: "JavaScript", color: "#F7DF1E" },
    stargazerCount: 0,
    forkCount: 0,
    topics: [
      "waste-management",
      "sustainability",
      "react",
      "nodejs",
      "mern-stack",
    ],
    screenshotUrl: "/project-screenshots/reviwa.png",
  },
  {
    id: "EasyPark",
    name: "EasyPark",
    description:
      "A functioning website for booking parking spaces in the city.",
    url: "https://github.com/Mayen007/EasyPark",
    homepageUrl: "https://easypark-lgqj.onrender.com/",
    primaryLanguage: { name: "HTML", color: "#E44D26" },
    stargazerCount: 0,
    forkCount: 0,
    topics: ["parking", "booking", "responsive-web-design"],
    screenshotUrl: "/project-screenshots/easypark.png",
  },
  {
    id: "qrgen",
    name: "qrgen",
    description:
      "A professional QR code generator application designed for URLs, WiFi credentials, contact cards, and plain text.",
    url: "https://github.com/Mayen007/qrgen",
    homepageUrl: "https://bluewey.netlify.app/",
    primaryLanguage: { name: "JavaScript", color: "#F7DF1E" },
    stargazerCount: 0,
    forkCount: 0,
    topics: ["react-router", "reactjs", "qr-code"],
    screenshotUrl: "/project-screenshots/qrgen.png",
  },
];

export const Projects = () => {
  const [filter, setFilter] = useState("all");

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
  const languages = [
    "all",
    ...new Set(
      PROJECTS.filter((repo) => repo.primaryLanguage).map(
        (repo) => repo.primaryLanguage.name,
      ),
    ),
  ];

  // Filter projects
  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((repo) => repo.primaryLanguage?.name === filter);

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
                  ? "bg-gradient text-white shadow-lg shadow-primary-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "all" ? "All Projects" : lang}
            </Motion.button>
          ))}
        </Motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <Motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Motion.div>
        ) : (
          <Motion.div variants={headingVariants} className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for this filter.
            </p>
          </Motion.div>
        )}

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
      </Motion.div>
    </Section>
  );
};
