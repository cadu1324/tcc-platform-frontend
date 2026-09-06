interface Shade {
  main: string;
  light: string;
  dark: string;
  contrast: string;
}

interface BadgeTone {
  background: string;
  text: string;
}

export interface Palette {
  primary: Shade;
  secondary: Shade;
  success: Shade;
  warning: Shade;
  error: Shade;
  background: {
    default: string;
    paper: string;
    dark: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  border: {
    light: string;
    main: string;
    dark: string;
  };
  badge: {
    info: BadgeTone;
    success: BadgeTone;
    warning: BadgeTone;
    error: BadgeTone;
  };
}

const lightColors: Palette = {
  primary: { main: '#185FA5', light: '#3B7FC4', dark: '#124A82', contrast: '#ffffff' },
  secondary: { main: '#5F5E5A', light: '#8A8984', dark: '#413F3C', contrast: '#ffffff' },
  success: { main: '#3B6D11', light: '#5C9A2A', dark: '#2C5209', contrast: '#ffffff' },
  warning: { main: '#BA7517', light: '#D99A3D', dark: '#8F5A11', contrast: '#000000' },
  error: { main: '#B42318', light: '#D6564A', dark: '#8C1B12', contrast: '#ffffff' },
  background: { default: '#F7F6F3', paper: '#FFFFFF', dark: '#2C2C2A' },
  text: { primary: '#2C2C2A', secondary: '#5F5E5A', disabled: '#B3B1AB', inverse: '#ffffff' },
  border: { light: '#F1EFE8', main: '#EBEBEB', dark: '#DEDCD5' },
  badge: {
    info: { background: '#E6F1FB', text: '#185FA5' },
    success: { background: '#EAF3DE', text: '#3B6D11' },
    warning: { background: '#FAEEDA', text: '#BA7517' },
    error: { background: '#FCEBEB', text: '#B42318' },
  },
};

const darkColors: Palette = {
  primary: { main: '#4C9BE8', light: '#71B4F0', dark: '#2F7FCB', contrast: '#0B1220' },
  secondary: { main: '#A5A39C', light: '#C4C2BB', dark: '#7A7871', contrast: '#14151A' },
  success: { main: '#7DBE4B', light: '#98D268', dark: '#5E9A32', contrast: '#0F1408' },
  warning: { main: '#E0A857', light: '#EDC17F', dark: '#B9853A', contrast: '#1E1608' },
  error: { main: '#E5484D', light: '#F2696D', dark: '#C13438', contrast: '#ffffff' },
  background: { default: '#14151A', paper: '#1D1F26', dark: '#0F1013' },
  text: { primary: '#E8E7E3', secondary: '#A9A8A2', disabled: '#6C6B66', inverse: '#14151A' },
  border: { light: '#292B32', main: '#33353D', dark: '#414450' },
  badge: {
    info: { background: '#132738', text: '#7FB6EE' },
    success: { background: '#18240F', text: '#9FD26C' },
    warning: { background: '#2C2009', text: '#E5B676' },
    error: { background: '#2E1310', text: '#EE9A92' },
  },
};

export const palettes = { light: lightColors, dark: darkColors } as const;

export const colors = lightColors;

export type Colors = Palette;
