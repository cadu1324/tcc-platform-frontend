import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  SelectWrapper,
  Label,
  StyledSelect,
  ErrorMessage,
} from './Select.styles';
import type { SelectSize } from './Select.styles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      size = 'md',
      fullWidth = false,
      placeholder,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <SelectWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={selectId}>{label}</Label>}
        <StyledSelect
          ref={ref}
          id={selectId}
          $size={size}
          $hasError={!!error}
          $fullWidth={fullWidth}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SelectWrapper>
    );
  }
);

Select.displayName = 'Select';
