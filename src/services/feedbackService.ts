import { apiGet, apiPost } from './httpClient';
import type { Feedback, CreateFeedbackData } from '../types';

export const feedbackService = {
  getByDelivery: (deliveryId: number) => apiGet<Feedback[]>(`/feedbacks/delivery/${deliveryId}`),
  create: (payload: CreateFeedbackData) => apiPost<Feedback>('/feedbacks', payload),
};
