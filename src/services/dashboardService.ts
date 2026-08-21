import { api } from './api';
import type { StudentDashboard, AdvisorDashboard, AdminDashboard } from '../types';

export const dashboardService = {
  async getStudentDashboard(): Promise<StudentDashboard> {
    const response = await api.get<StudentDashboard>('/dashboard/student');
    return response.data;
  },

  async getAdvisorDashboard(): Promise<AdvisorDashboard> {
    const response = await api.get<AdvisorDashboard>('/dashboard/advisor');
    return response.data;
  },

  async getAdminDashboard(): Promise<AdminDashboard> {
    const response = await api.get<AdminDashboard>('/dashboard/admin');
    return response.data;
  },
};
