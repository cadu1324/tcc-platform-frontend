import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';

export function useStudentDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['student-dashboard', user?.id],
    queryFn: () => dashboardService.getStudentDashboard(),
    enabled: !!user,
  });
}
