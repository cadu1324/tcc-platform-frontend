export const colors = {
  primary: {
    main: '#185FA5',
    light: '#3B7FC4',
    dark: '#124A82',
    contrast: '#ffffff',
  },
  secondary: {
    main: '#5F5E5A',
    light: '#8A8984',
    dark: '#413F3C',
    contrast: '#ffffff',
  },
  success: {
    main: '#3B6D11',
    light: '#5C9A2A',
    dark: '#2C5209',
    contrast: '#ffffff',
  },
  warning: {
    main: '#BA7517',
    light: '#D99A3D',
    dark: '#8F5A11',
    contrast: '#000000',
  },
  error: {
    main: '#B42318',
    light: '#D6564A',
    dark: '#8C1B12',
    contrast: '#ffffff',
  },
  background: {
    default: '#F7F6F3',
    paper: '#FFFFFF',
    dark: '#2C2C2A',
  },
  text: {
    primary: '#2C2C2A',
    secondary: '#5F5E5A',
    disabled: '#B3B1AB',
    inverse: '#ffffff',
  },
  border: {
    light: '#F1EFE8',
    main: '#EBEBEB',
    dark: '#DEDCD5',
  },
  badge: {
    info: { background: '#E6F1FB', text: '#185FA5' },
    success: { background: '#EAF3DE', text: '#3B6D11' },
    warning: { background: '#FAEEDA', text: '#BA7517' },
    error: { background: '#FCEBEB', text: '#B42318' },
  },
} as const;

export type Colors = typeof colors;
