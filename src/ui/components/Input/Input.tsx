import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  InputWrapper,
  Label,
  StyledInput,
  ErrorMessage,
  HelperText,
} from './Input.styles';
import type { InputSize } from './Input.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <StyledInput
          ref={ref}
          id={inputId}
          $size={size}
          $hasError={!!error}
          $fullWidth={fullWidth}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
