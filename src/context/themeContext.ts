import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const THEME_STORAGE_KEY = '@tcc-platform:theme';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
