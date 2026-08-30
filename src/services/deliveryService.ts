import { apiGet, apiPost, apiPut, apiDelete } from './httpClient';
import type { Delivery, CreateDeliveryData, UpdateDeliveryData } from '../types';

export const deliveryService = {
  getByProject: (projectId: number) => apiGet<Delivery[]>(`/deliveries/project/${projectId}`),
  getById: (id: number) => apiGet<Delivery>(`/deliveries/${id}`),
  create: (payload: CreateDeliveryData) => apiPost<Delivery>('/deliveries', payload),
  update: (id: number, payload: UpdateDeliveryData) => apiPut<Delivery>(`/deliveries/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/deliveries/${id}`),
};
