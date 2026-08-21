import { api } from './api';
import type { Milestone, CreateMilestoneData, UpdateMilestoneData } from '../types';

export const milestoneService = {
  async getByProject(projectId: number): Promise<Milestone[]> {
    const response = await api.get<Milestone[]>(`/milestones/project/${projectId}`);
    return response.data;
  },

  async create(data: CreateMilestoneData): Promise<Milestone> {
    const response = await api.post<Milestone>('/milestones', data);
    return response.data;
  },

  async update(id: number, data: UpdateMilestoneData): Promise<Milestone> {
    const response = await api.put<Milestone>(`/milestones/${id}`, data);
    return response.data;
  },
};
