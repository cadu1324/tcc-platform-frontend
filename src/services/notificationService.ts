import { apiGet, apiPatch } from './httpClient';
import type { Notification } from '../types';

export const notificationService = {
  getMine: () => apiGet<Notification[]>('/notifications'),
  markAsRead: (id: number) => apiPatch<Notification>(`/notifications/${id}/read`),
};
