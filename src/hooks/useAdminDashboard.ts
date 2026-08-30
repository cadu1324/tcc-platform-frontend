import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';
import type { AdminDashboard } from '../types';

export function useAdminDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['admin-dashboard', user?.id],
    queryFn: () => dashboardService.get<AdminDashboard>(),
    enabled: !!user,
  });
}
