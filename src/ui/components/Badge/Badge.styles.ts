import styled, { css } from 'styled-components';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md';

interface BadgeStyledProps {
  $variant: BadgeVariant;
  $size: BadgeSize;
}

const variantStyles: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`
    background-color: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.badge.info.background};
    color: ${({ theme }) => theme.colors.badge.info.text};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.badge.success.background};
    color: ${({ theme }) => theme.colors.badge.success.text};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.badge.warning.background};
    color: ${({ theme }) => theme.colors.badge.warning.text};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.badge.error.background};
    color: ${({ theme }) => theme.colors.badge.error.text};
  `,
};

const sizeStyles: Record<BadgeSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 2px 7px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: 3px 10px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
};

export const StyledBadge = styled.span<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  white-space: nowrap;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;
