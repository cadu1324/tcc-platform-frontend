import styled from 'styled-components';

export type ProgressBarVariant = 'thin' | 'medium';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'error';

const heights: Record<ProgressBarVariant, string> = {
  thin: '3px',
  medium: '5px',
};

const radii: Record<ProgressBarVariant, string> = {
  thin: '2px',
  medium: '3px',
};

export const Track = styled.div<{ $variant: ProgressBarVariant }>`
  width: 100%;
  height: ${({ $variant }) => heights[$variant]};
  background-color: ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ $variant }) => radii[$variant]};
  overflow: hidden;
`;

export const Fill = styled.div<{ $value: number; $color: ProgressBarColor }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background-color: ${({ theme, $color }) =>
    ({
      primary: theme.colors.primary.main,
      success: theme.colors.success.main,
      warning: theme.colors.warning.main,
      error: theme.colors.error.main,
    })[$color]};
  border-radius: inherit;
  transition: width 0.3s ease;
`;
