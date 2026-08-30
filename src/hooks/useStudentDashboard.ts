import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';
import type { StudentDashboard } from '../types';

export function useStudentDashboard() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['student-dashboard', user?.id],
    queryFn: () => dashboardService.get<StudentDashboard>(),
    enabled: !!user,
  });
}
