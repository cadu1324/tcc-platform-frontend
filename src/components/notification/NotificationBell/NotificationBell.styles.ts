import styled from 'styled-components';

export const BellWrap = styled.div`
  position: relative;
`;

export const BellButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const UnreadCount = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.error.main};
  color: #fff;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Panel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 340px;
  max-width: 90vw;
  max-height: 420px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 50;

  @media (max-width: 640px) {
    position: fixed;
    top: 60px;
    left: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
    width: auto;
    max-width: none;
    max-height: calc(100vh - 72px);
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const PanelTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MarkAllButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: default;
  }
`;

export const Item = styled.button<{ $unread: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $unread }) =>
    $unread ? theme.colors.badge.info.background : 'transparent'};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.light};
  }
`;

export const ItemText = styled.span<{ $unread: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme, $unread }) =>
    $unread ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular};
`;

export const ItemTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyRow = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.disabled};
`;
