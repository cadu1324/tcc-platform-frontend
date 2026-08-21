import { api } from './api';
import type { Feedback, FeedbackWithRelations, CreateFeedbackData } from '../types';

export const feedbackService = {
  async getByDelivery(deliveryId: number): Promise<Feedback[]> {
    const response = await api.get<Feedback[]>(`/feedbacks/delivery/${deliveryId}`);
    return response.data;
  },

  async getMyFeedbacks(): Promise<FeedbackWithRelations[]> {
    const response = await api.get<FeedbackWithRelations[]>('/feedbacks/mine');
    return response.data;
  },

  async create(data: CreateFeedbackData): Promise<Feedback> {
    const response = await api.post<Feedback>('/feedbacks', data);
    return response.data;
  },
};
