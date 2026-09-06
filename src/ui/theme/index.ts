import { palettes, colors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography } from './typography';

export type ThemeMode = 'light' | 'dark';

export function createTheme(mode: ThemeMode) {
  return {
    mode,
    colors: palettes[mode],
    spacing,
    borderRadius,
    typography,
  };
}

export const theme = createTheme('light');

export type Theme = ReturnType<typeof createTheme>;

export { colors, palettes, spacing, borderRadius, typography };
