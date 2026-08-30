import { apiGet, apiPost, apiPut, apiDelete } from './httpClient';
import type { Milestone, CreateMilestoneData, UpdateMilestoneData } from '../types';

export const milestoneService = {
  getByProject: (projectId: number) => apiGet<Milestone[]>(`/milestones/project/${projectId}`),
  getById: (id: number) => apiGet<Milestone>(`/milestones/${id}`),
  create: (payload: CreateMilestoneData) => apiPost<Milestone>('/milestones', payload),
  update: (id: number, payload: UpdateMilestoneData) => apiPut<Milestone>(`/milestones/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/milestones/${id}`),
};
