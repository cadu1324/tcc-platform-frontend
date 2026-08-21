import { api } from './api';
import type { StudentDashboard } from '../types';

export const dashboardService = {
  async getStudentDashboard(): Promise<StudentDashboard> {
    const response = await api.get<StudentDashboard>('/dashboard/student');
    return response.data;
  },
};
