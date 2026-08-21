import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const LayoutBody = styled.div`
  display: flex;
  flex: 1;
  overflow: visible;
`;

export const LayoutContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.default};
  overflow-y: auto;
`;
