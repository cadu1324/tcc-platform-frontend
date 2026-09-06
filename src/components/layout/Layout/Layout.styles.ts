import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const LayoutBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

export const LayoutContent = styled.main`
  flex: 1;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.default};
  overflow-y: auto;
`;
