import { ProjectStatus } from '../types';
import type { Project } from '../types';

export type ProjectDisplayStatus = 'in_progress' | 'completed' | 'cancelled' | 'overdue';

export function getProjectDisplayStatus(project: Project): ProjectDisplayStatus {
  if (project.status !== ProjectStatus.IN_PROGRESS) return project.status;

  if (project.expected_delivery_date) {
    const dueDate = new Date(project.expected_delivery_date);
    dueDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate.getTime() < today.getTime()) return 'overdue';
  }

  return ProjectStatus.IN_PROGRESS;
}

export const projectDisplayStatusLabel = {
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
  overdue: 'Atrasado',
} as const satisfies Record<ProjectDisplayStatus, string>;

export const projectDisplayStatusBadgeVariant = {
  in_progress: 'info',
  completed: 'success',
  cancelled: 'default',
  overdue: 'error',
} as const satisfies Record<ProjectDisplayStatus, 'info' | 'success' | 'default' | 'error'>;

export function getProjectProgress(project: Project): number {
  const total = project.milestones_total ?? 0;
  const completed = project.milestones_completed ?? 0;
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
