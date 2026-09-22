import styled from 'styled-components';

export const SwitchLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

export const Track = styled.span<{ $checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary.main : theme.colors.border.dark};
  transition: background-color 0.15s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $checked }) => ($checked ? '20px' : '2px')};
    width: 18px;
    height: 18px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: ${({ theme }) => theme.colors.background.paper};
    transition: left 0.15s ease;
  }
`;

export const SwitchText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;
