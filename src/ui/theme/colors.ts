export const colors = {
  primary: {
    main: '#2563eb',
    light: '#3b82f6',
    dark: '#1d4ed8',
    contrast: '#ffffff',
  },
  secondary: {
    main: '#64748b',
    light: '#94a3b8',
    dark: '#475569',
    contrast: '#ffffff',
  },
  success: {
    main: '#22c55e',
    light: '#4ade80',
    dark: '#16a34a',
    contrast: '#ffffff',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    contrast: '#000000',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    contrast: '#ffffff',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
    dark: '#1e293b',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
    inverse: '#ffffff',
  },
  border: {
    light: '#e2e8f0',
    main: '#cbd5e1',
    dark: '#94a3b8',
  },
} as const;

export type Colors = typeof colors;
