/**
 * useTheme Hook
 * Custom hook to access theme context
 */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Hook to access theme state and toggle function
 * Must be used within ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
