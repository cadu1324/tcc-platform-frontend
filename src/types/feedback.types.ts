export interface Feedback {
  id: number;
  delivery_id: number;
  advisor_id: number;
  comment: string;
  grade: number;
  created_at: string;
}

export interface CreateFeedbackData {
  delivery_id: number;
  comment: string;
  grade: number;
}
