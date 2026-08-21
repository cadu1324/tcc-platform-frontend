import type { ReactNode } from 'react';
import { StyledBadge } from './Badge.styles';
import type { BadgeVariant, BadgeSize } from './Badge.styles';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $size={size}>
      {children}
    </StyledBadge>
  );
}
