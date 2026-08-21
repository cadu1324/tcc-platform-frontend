import { api } from './api';
import type {
  Delivery,
  CreateDeliveryData,
  SubmitDeliveryData,
  ReviewDeliveryData,
} from '../types';

export const deliveryService = {
  async getByProject(projectId: string): Promise<Delivery[]> {
    const response = await api.get<Delivery[]>(`/deliveries/project/${projectId}`);
    return response.data;
  },

  async getById(id: string): Promise<Delivery> {
    const response = await api.get<Delivery>(`/deliveries/${id}`);
    return response.data;
  },

  async create(data: CreateDeliveryData): Promise<Delivery> {
    const response = await api.post<Delivery>('/deliveries', data);
    return response.data;
  },

  async submit(id: string, data: SubmitDeliveryData): Promise<Delivery> {
    const response = await api.patch<Delivery>(`/deliveries/${id}/submit`, data);
    return response.data;
  },

  async review(id: string, data: ReviewDeliveryData): Promise<Delivery> {
    const response = await api.patch<Delivery>(`/deliveries/${id}/review`, data);
    return response.data;
  },
};
