import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const AuthCard = styled.div`
  width: 380px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CardTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BackLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: center;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const SuccessBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.success.light};
  color: ${({ theme }) => theme.colors.success.dark};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

export const ErrorBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.badge.error.background};
  color: ${({ theme }) => theme.colors.badge.error.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
