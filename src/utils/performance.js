/**
 * Performance Monitoring Utilities
 * Track and report key web vitals
 */

/**
 * Report Web Vitals to console (or analytics service)
 * Tracks: LCP, FID, CLS, FCP, TTFB
 */
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

/**
 * Simple performance logger for development
 */
export const logPerformance = () => {
  if (import.meta.env.DEV) {
    // Performance marks
    performance.mark('app-start');

    window.addEventListener('load', () => {
      performance.mark('app-loaded');
      performance.measure('app-load-time', 'app-start', 'app-loaded');

      const measure = performance.getEntriesByName('app-load-time')[0];
      console.log(`⚡ App loaded in ${measure.duration.toFixed(2)}ms`);
    });
  }
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImage = (img) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        if (image.dataset.src) {
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          observer.unobserve(image);
        }
      }
    });
  });

  observer.observe(img);
};
