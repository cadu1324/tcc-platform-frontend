import styled from 'styled-components';
import { Spinner } from '../ui';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export function RouteFallback() {
  return (
    <Wrap>
      <Spinner size="lg" />
    </Wrap>
  );
}
