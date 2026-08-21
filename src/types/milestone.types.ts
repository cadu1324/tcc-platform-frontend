export const MilestoneStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;
export type MilestoneStatus = (typeof MilestoneStatus)[keyof typeof MilestoneStatus];

export interface Milestone {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  status: MilestoneStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateMilestoneData {
  project_id: number;
  title: string;
  description?: string;
  due_date?: string;
}

export interface UpdateMilestoneData {
  title?: string;
  description?: string;
  due_date?: string;
  status?: MilestoneStatus;
}
