import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { useAuth } from './useAuth';

export function useAdvisorProjects() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['advisor-projects', user?.id],
    queryFn: () => projectService.getByAdvisor(user!.id.toString()),
    enabled: !!user,
  });
}
