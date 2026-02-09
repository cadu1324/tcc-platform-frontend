import styled, { css } from 'styled-components';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeStyledProps {
  $variant: BadgeVariant;
  $size: BadgeSize;
}

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.text};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success}20;
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warning}20;
    color: ${({ theme }) => theme.colors.warning};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error}20;
    color: ${({ theme }) => theme.colors.error};
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.info}20;
    color: ${({ theme }) => theme.colors.info};
  `,
};

const sizeStyles = {
  sm: css`
    padding: 2px 8px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: 4px 12px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
};

export const StyledBadge = styled.span<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;
