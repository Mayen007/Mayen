/**
 * SEO Component
 * Dynamic meta tags for different pages/sections
 */

import { useEffect } from "react";

export const SEO = ({
  title = "Mayen Akech - Full-Stack Developer",
  description = "Full-Stack Developer passionate about building innovative web solutions. Specializing in React, Python, Node.js, and modern web technologies.",
  image = "https://mayenakech.netlify.app/og-image.png",
  url = "https://mayenakech.netlify.app",
  type = "website",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property, content) => {
      let element =
        document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`);

      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", property);
        }
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // Update all meta tags
    updateMetaTag("description", description);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:url", url);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", url);
    }
  }, [title, description, image, url, type]);

  return null;
};
