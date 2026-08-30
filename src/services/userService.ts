import { apiGet, apiPost, apiPut, apiDelete } from './httpClient';
import type { User, RegisterData } from '../types';

export const userService = {
  getAll: () => apiGet<User[]>('/users'),
  getById: (id: number) => apiGet<User>(`/users/${id}`),
  create: (payload: RegisterData) => apiPost<User>('/users', payload),
  update: (id: number, payload: Partial<RegisterData>) => apiPut<User>(`/users/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/users/${id}`),
};
