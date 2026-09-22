export const DeliveryStatus = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;
export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus];

export interface Delivery {
  id: number;
  project_id: number;
  milestone_id: number | null;
  title: string;
  description: string;
  deadline: string | null;
  status: DeliveryStatus;
  file_url: string | null;
  file_name: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  /** Optional enrichment the backend includes on list responses. */
  milestone_title?: string | null;
}

export interface CreateDeliveryData {
  project_id: number;
  milestone_id: number;
  title: string;
  description: string;
  deadline?: string;
}

export interface UpdateDeliveryData {
  title?: string;
  description?: string;
  deadline?: string;
  status?: DeliveryStatus;
  file_url?: string;
  submitted_at?: string;
}

export interface DeliveryFileVersion {
  id: number;
  version: number;
  file_name: string;
  size_bytes: number;
  status: DeliveryStatus;
  created_at: string;
}
