import styled from 'styled-components';

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ErrorBanner = styled.p`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.badge.error.background};
  color: ${({ theme }) => theme.colors.badge.error.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
