import styled from 'styled-components';

export const ManageUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ManageUsersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ManageUsersTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ActiveBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.success.light : theme.colors.error.light};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.success.dark : theme.colors.error.dark};
`;
