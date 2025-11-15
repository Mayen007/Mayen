/**
 * Footer Component
 * Site footer with social links and copyright
 */

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiFreecodecamp } from "react-icons/si";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      name: "Email",
      href: "mailto:mayenakech9@gmail.com",
      icon: FiMail,
    },
    {
      name: "FreeCodeCamp",
      href: "https://freecodecamp.org/Mayen007",
      icon: SiFreecodecamp,
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 hover:scale-110"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              © {currentYear} Mayen Akech. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Built with React, Tailwind CSS & Framer Motion 🚀
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
