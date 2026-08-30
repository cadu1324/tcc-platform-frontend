import { apiGet } from './httpClient';
import type { StudentDashboard, AdvisorDashboard, AdminDashboard } from '../types';

type Dashboard = StudentDashboard | AdvisorDashboard | AdminDashboard;

export const dashboardService = {
  get: <T extends Dashboard>() => apiGet<T>('/dashboard'),
};
