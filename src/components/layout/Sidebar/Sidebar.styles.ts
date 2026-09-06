import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 56px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  flex-shrink: 0;
  overflow: visible;
  z-index: 10;

  @media (max-width: 640px) {
    width: 44px;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const NavBadge = styled.span`
  position: absolute;
  top: 1px;
  right: 1px;
  min-width: 15px;
  height: 15px;
  padding: 0 3px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.error.main};
  color: #fff;
  font-size: 9px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const SidebarLabel = styled.span`
  position: absolute;
  left: calc(100% + 12px);
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  pointer-events: none;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.18s ease, transform 0.18s ease;
`;

export const SidebarItem = styled.button<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.border.main : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.disabled};
  transition: background-color 0.15s ease, color 0.15s ease;

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.main};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover ${SidebarLabel} {
    opacity: 1;
    transform: translateX(0);
  }
`;
