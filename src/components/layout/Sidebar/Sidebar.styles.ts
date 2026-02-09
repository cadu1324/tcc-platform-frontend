import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const SidebarLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.secondary};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main + '10' : 'transparent'};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.light};
    text-decoration: none;
  }
`;
