import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '../ui/theme';
import { ThemeContext, THEME_STORAGE_KEY } from './themeContext';
import type { ThemeMode } from './themeContext';

function getInitialThemeMode(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const contextValue = useMemo(
    () => ({ themeMode, toggleTheme, setThemeMode }),
    [themeMode, toggleTheme, setThemeMode],
  );

  const styledTheme = useMemo(() => createTheme(themeMode), [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
