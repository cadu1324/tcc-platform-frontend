import { api } from './api';
import type { Project, CreateProjectData, UpdateProjectData } from '../types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async create(data: CreateProjectData): Promise<Project> {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  async update(id: string, data: UpdateProjectData): Promise<Project> {
    const response = await api.put<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  async getByStudent(studentId: string): Promise<Project[]> {
    const response = await api.get<Project[]>(`/projects/student/${studentId}`);
    return response.data;
  },

  async getByAdvisor(advisorId: string): Promise<Project[]> {
    const response = await api.get<Project[]>(`/projects/advisor/${advisorId}`);
    return response.data;
  },
};
