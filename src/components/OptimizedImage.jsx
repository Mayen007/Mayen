/**
 * Image Component with Lazy Loading
 * Optimized image loading with fallback
 */

import { useState, useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";

export const OptimizedImage = ({
  src,
  alt,
  className = "",
  fallback = "/placeholder.svg",
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };

      img.onerror = () => {
        setImageSrc(fallback);
        setIsLoading(false);
      };
    };

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before image is visible
      }
    );

    const currentRef = imgRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, fallback]);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0.5 : 1 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={className}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </Motion.div>
  );
};
