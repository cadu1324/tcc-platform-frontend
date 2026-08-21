import { Badge } from '../Badge';
import { ProgressBar } from '../ProgressBar';
import type { BadgeVariant } from '../Badge';
import { StatCardContainer, StatValue, StatLabel, StatExtra } from './StatCard.styles';

export interface StatCardBadge {
  text: string;
  variant: BadgeVariant;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  badge?: StatCardBadge;
  progress?: number;
  className?: string;
}

export function StatCard({ value, label, badge, progress, className }: StatCardProps) {
  return (
    <StatCardContainer className={className}>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
      {progress !== undefined && (
        <StatExtra>
          <ProgressBar value={progress} variant="medium" />
        </StatExtra>
      )}
      {badge && (
        <StatExtra>
          <Badge variant={badge.variant} size="sm">{badge.text}</Badge>
        </StatExtra>
      )}
    </StatCardContainer>
  );
}
