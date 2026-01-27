import { HTMLAttributes, ReactNode } from 'react';
import {
  StyledCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardVariant,
} from './Card.styles';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  clickable?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'elevated',
  clickable = false,
  children,
  ...props
}: CardProps) {
  return (
    <StyledCard $variant={variant} $clickable={clickable} {...props}>
      {children}
    </StyledCard>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
