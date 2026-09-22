import { MilestoneStatus } from '../types';
import type { Milestone } from '../types';
import { daysUntil } from './formatDate';

export type MilestoneUrgency = 'completed' | 'overdue' | 'due_soon' | 'upcoming';

const DUE_SOON_THRESHOLD_DAYS = 7;

export function getMilestoneUrgency(milestone: Milestone): MilestoneUrgency {
  if (milestone.status === MilestoneStatus.COMPLETED) return 'completed';

  const remainingDays = daysUntil(milestone.due_date);
  if (remainingDays === null) return 'upcoming';
  if (remainingDays < 0) return 'overdue';
  if (remainingDays <= DUE_SOON_THRESHOLD_DAYS) return 'due_soon';
  return 'upcoming';
}

export const milestoneUrgencyBadgeVariant = {
  completed: 'success',
  overdue: 'error',
  due_soon: 'warning',
  upcoming: 'info',
} as const satisfies Record<MilestoneUrgency, 'success' | 'error' | 'warning' | 'info'>;

export const milestoneUrgencyLabel = {
  completed: 'Concluído',
  overdue: 'Atrasado',
  due_soon: 'Prazo próximo',
  upcoming: 'Pendente',
} as const satisfies Record<MilestoneUrgency, string>;

export const milestoneUrgencyDotColor = {
  completed: '#22c55e',
  overdue: '#ef4444',
  due_soon: '#f59e0b',
  upcoming: '#3b82f6',
} as const satisfies Record<MilestoneUrgency, string>;
