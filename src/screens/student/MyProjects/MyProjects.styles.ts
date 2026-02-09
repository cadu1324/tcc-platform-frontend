import styled from 'styled-components';

export const MyProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MyProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MyProjectsTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
