import { StyledAvatar } from './Avatar.styles';
import type { AvatarSize, AvatarScheme } from './Avatar.styles';

export type { AvatarSize, AvatarScheme };

export interface AvatarProps {
  name: string;
  size?: AvatarSize;
  scheme?: AvatarScheme;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, size = 'md', scheme = 'blue', className }: AvatarProps) {
  return (
    <StyledAvatar $size={size} $scheme={scheme} className={className} aria-label={name}>
      {getInitials(name)}
    </StyledAvatar>
  );
}
