import styled from 'styled-components';

export const UploadContainer = styled.div<{ $isDragging: boolean }>`
  border: 1px dashed
    ${({ theme, $isDragging }) =>
      $isDragging ? theme.colors.primary.main : theme.colors.border.dark};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.badge.info.background : theme.colors.border.light};
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
  outline: none;

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.badge.info.background};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  svg {
    color: inherit;
    flex-shrink: 0;
  }
`;

export const UploadLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const UploadSublabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
`;
