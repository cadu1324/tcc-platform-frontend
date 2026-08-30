import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';
import type { AdvisorDashboard } from '../types';

export function useAdvisorDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['advisor-dashboard', user?.id],
    queryFn: () => dashboardService.get<AdvisorDashboard>(),
    enabled: !!user,
  });
}
