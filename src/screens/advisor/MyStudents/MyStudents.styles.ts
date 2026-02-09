import styled from 'styled-components';

export const MyStudentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MyStudentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MyStudentsTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
