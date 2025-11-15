/**
 * Timeline Component
 * Education and career milestones
 */

import { motion as Motion } from "framer-motion";
import { FiCalendar, FiBook, FiCode, FiAward } from "react-icons/fi";
import { Section } from "./ui/Container";

export const Timeline = () => {
  const milestones = [
    {
      year: "2027",
      title: "BSc Information Technology",
      subtitle: "Mount Kenya University (Expected)",
      description:
        "Specializing in software development, database management, and systems design.",
      icon: FiBook,
      color: "from-blue-500 to-cyan-500",
      status: "upcoming",
    },
    {
      year: "2025",
      title: "Power Learn Project Africa",
      subtitle: "MERN Stack / Full-Stack Development",
      description:
        "Specialized training in MongoDB, Express.js, React, and Node.js. Building production-ready full-stack applications.",
      icon: FiAward,
      color: "from-purple-500 to-pink-500",
      status: "current",
    },
    {
      year: "2023",
      title: "Backend Development",
      subtitle: "API Design & Database Architecture",
      description:
        "Developed RESTful APIs, implemented authentication systems, and optimized database queries.",
      icon: FiCode,
      color: "from-green-500 to-emerald-500",
      status: "completed",
    },
    {
      year: "2022",
      title: "Started Coding Journey",
      subtitle: "Frontend & Problem Solving",
      description:
        "Began with HTML, CSS, and JavaScript. Solved algorithmic challenges on freeCodeCamp.",
      icon: FiAward,
      color: "from-orange-500 to-red-500",
      status: "completed",
    },
  ];

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="timeline" className="bg-gray-50 dark:bg-gray-800/50">
      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <Motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Journey & Milestones</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            My path in software development - from learning the basics to
            building full-stack applications.
          </p>
        </Motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isLeft = index % 2 === 0;

                return (
                  <Motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      isLeft ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Card */}
                    <div
                      className={`flex-1 ml-20 md:ml-0 ${
                        isLeft ? "md:text-right md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <Motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        whileHover={{ y: -5 }}
                      >
                        {/* Year Badge */}
                        <div
                          className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 bg-gradient-to-r ${milestone.color} text-white`}
                        >
                          {milestone.year}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
                          {milestone.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {milestone.description}
                        </p>

                        {/* Status Badge */}
                        {milestone.status === "current" && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              Currently Active
                            </span>
                          </div>
                        )}
                      </Motion.div>
                    </div>

                    {/* Icon */}
                    <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-16 h-16 flex items-center justify-center">
                      <Motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </Motion.div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1" />
                  </Motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Motion.div>
    </Section>
  );
};
