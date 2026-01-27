export type DeliveryStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export interface Delivery {
  id: string;
  project_id: string;
  title: string;
  description: string;
  deadline: string;
  status: DeliveryStatus;
  file_url: string | null;
  feedback: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDeliveryData {
  project_id: string;
  title: string;
  description: string;
  deadline: string;
}

export interface SubmitDeliveryData {
  file_url: string;
}

export interface ReviewDeliveryData {
  status: 'approved' | 'rejected';
  feedback: string;
}
