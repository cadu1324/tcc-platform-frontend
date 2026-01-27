export type ProjectStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  expected_delivery_date: string;
  student_id: string;
  advisor_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  expected_delivery_date: string;
  advisor_id: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  expected_delivery_date?: string;
}
