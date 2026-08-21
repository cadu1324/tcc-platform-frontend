import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => dashboardService.getAdminDashboard(),
  });
}
