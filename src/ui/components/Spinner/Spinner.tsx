import { SpinnerWrapper, StyledSpinner } from './Spinner.styles';
import type { SpinnerSize } from './Spinner.styles';

export interface SpinnerProps {
  size?: SpinnerSize;
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <SpinnerWrapper>
      <StyledSpinner $size={size} />
    </SpinnerWrapper>
  );
}
