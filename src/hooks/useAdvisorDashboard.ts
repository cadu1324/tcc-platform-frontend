import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';

export function useAdvisorDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['advisor-dashboard', user?.id],
    queryFn: () => dashboardService.getAdvisorDashboard(),
    enabled: !!user,
  });
}
