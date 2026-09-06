import { apiGet, apiPost, apiPut, apiDelete } from './httpClient';
import type { User, CreateUserData, UpdateUserData, AdvisorOption } from '../types';

export const userService = {
  getAll: () => apiGet<User[]>('/users'),
  getAdvisors: () => apiGet<AdvisorOption[]>('/users/advisors'),
  getById: (id: number) => apiGet<User>(`/users/${id}`),
  create: (payload: CreateUserData) => apiPost<User>('/users', payload),
  update: (id: number, payload: UpdateUserData) => apiPut<User>(`/users/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/users/${id}`),
};
