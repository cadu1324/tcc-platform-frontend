import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import type { ThemeContextValue } from '../context/themeContext';

export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeContextProvider');
  }
  return context;
}
