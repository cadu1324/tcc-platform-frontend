export const ProjectStatus = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  start_date: string | null;
  expected_delivery_date: string | null;
  student_id: number;
  advisor_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  student_id: number;
  advisor_id: number;
  expected_delivery_date?: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  advisor_id?: number;
  status?: ProjectStatus;
  expected_delivery_date?: string;
}
