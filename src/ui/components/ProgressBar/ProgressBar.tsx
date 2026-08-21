import { Track, Fill } from './ProgressBar.styles';
import type { ProgressBarVariant, ProgressBarColor } from './ProgressBar.styles';

export type { ProgressBarVariant, ProgressBarColor };

export interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  color?: ProgressBarColor;
  className?: string;
}

export function ProgressBar({
  value,
  variant = 'thin',
  color = 'primary',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <Track $variant={variant} className={className}>
      <Fill $value={clamped} $color={color} />
    </Track>
  );
}
