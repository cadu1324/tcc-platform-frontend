import type { ReactNode } from 'react';
import {
  TableContainer,
  StyledTable,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  EmptyMessage,
} from './Table.styles';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'Nenhum dado encontrado',
  onRowClick,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <TableContainer>
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.key}>{column.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={keyExtractor(item)}
              $clickable={!!onRowClick}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(item)
                    : (item as Record<string, unknown>)[column.key] as ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
