import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { SwitchLabel, HiddenInput, Track, SwitchText } from './Switch.styles';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, checked, disabled, ...props }, ref) => {
    return (
      <SwitchLabel $disabled={disabled}>
        <HiddenInput ref={ref} type="checkbox" checked={checked} disabled={disabled} {...props} />
        <Track $checked={!!checked} />
        {label && <SwitchText>{label}</SwitchText>}
      </SwitchLabel>
    );
  },
);

Switch.displayName = 'Switch';
