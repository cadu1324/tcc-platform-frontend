import styled, { css } from 'styled-components';

export type SelectSize = 'sm' | 'md' | 'lg';

interface StyledSelectProps {
  $size: SelectSize;
  $hasError: boolean;
  $fullWidth: boolean;
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  `,
};

export const SelectWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StyledSelect = styled.select<StyledSelectProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) => sizeStyles[$size]}

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error.light + '40' : theme.colors.primary.light + '40'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.light};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error.main};
`;
