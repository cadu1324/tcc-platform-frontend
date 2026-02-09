import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

export const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
