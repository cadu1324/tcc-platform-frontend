import styled from 'styled-components';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

interface StyledCardProps {
  $variant: CardVariant;
  $clickable: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all 0.2s ease-in-out;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return `
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
        `;
      case 'outlined':
        return `
          border: 1px solid ${theme.colors.border.light};
        `;
      case 'filled':
        return `
          background-color: ${theme.colors.background.default};
        `;
    }
  }}

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;
