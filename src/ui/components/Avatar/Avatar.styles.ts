import styled from 'styled-components';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarScheme = 'blue' | 'amber' | 'red' | 'neutral';

const dimensions: Record<AvatarSize, { size: string; fontSize: string }> = {
  sm: { size: '22px', fontSize: '8px' },
  md: { size: '30px', fontSize: '10px' },
  lg: { size: '48px', fontSize: '14px' },
};

export const StyledAvatar = styled.div<{ $size: AvatarSize; $scheme: AvatarScheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  user-select: none;

  width: ${({ $size }) => dimensions[$size].size};
  height: ${({ $size }) => dimensions[$size].size};
  font-size: ${({ $size }) => dimensions[$size].fontSize};

  background-color: ${({ theme, $scheme }) =>
    ({
      blue: theme.colors.badge.info.background,
      amber: theme.colors.badge.warning.background,
      red: theme.colors.badge.error.background,
      neutral: theme.colors.border.main,
    })[$scheme]};

  color: ${({ theme, $scheme }) =>
    ({
      blue: theme.colors.badge.info.text,
      amber: theme.colors.badge.warning.text,
      red: theme.colors.badge.error.text,
      neutral: theme.colors.text.secondary,
    })[$scheme]};
`;
