import styled from 'styled-components';

export const ErrorBanner = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.badge.error.background};
  color: ${({ theme }) => theme.colors.badge.error.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
