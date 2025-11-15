/**
 * Theme Context
 * Manages dark/light theme state across the application
 */

import { createContext, useEffect, useState } from "react";

// Internal context - use useTheme hook to access
const ThemeContext = createContext(undefined);

// Export for hook usage only
export { ThemeContext };

/**
 * Theme Provider Component
 * Provides theme state and toggle function to all children
 * Persists theme preference in localStorage
 */
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Update document class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
