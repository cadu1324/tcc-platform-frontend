import { ChipsContainer, Chip } from './Chips.styles';

export interface ChipOption {
  value: string;
  label: string;
  count?: number;
}

export interface ChipsProps {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Chips({ options, value, onChange, className }: ChipsProps) {
  return (
    <ChipsContainer className={className}>
      {options.map((option) => (
        <Chip
          key={option.value}
          type="button"
          $active={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.count !== undefined
            ? `${option.label} (${option.count})`
            : option.label}
        </Chip>
      ))}
    </ChipsContainer>
  );
}
