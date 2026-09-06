import styled, { keyframes } from 'styled-components';

export type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerStyledProps {
  $size: SpinnerSize;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const sizeMap = {
  sm: '16px',
  md: '24px',
  lg: '40px',
};

const borderWidthMap = {
  sm: '2px',
  md: '3px',
  lg: '4px',
};

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSpinner = styled.div<SpinnerStyledProps>`
  width: ${({ $size }) => sizeMap[$size]};
  height: ${({ $size }) => sizeMap[$size]};
  border: ${({ $size }) => borderWidthMap[$size]} solid ${({ theme }) => theme.colors.border.main};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
