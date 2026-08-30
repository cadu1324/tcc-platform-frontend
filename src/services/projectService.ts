import { apiGet, apiPost, apiPut, apiDelete } from './httpClient';
import type { Project, CreateProjectData, UpdateProjectData } from '../types';

export const projectService = {
  getAll: () => apiGet<Project[]>('/projects'),
  getById: (id: number) => apiGet<Project>(`/projects/${id}`),
  create: (payload: CreateProjectData) => apiPost<Project>('/projects', payload),
  update: (id: number, payload: UpdateProjectData) => apiPut<Project>(`/projects/${id}`, payload),
  remove: (id: number) => apiDelete<void>(`/projects/${id}`),
};
