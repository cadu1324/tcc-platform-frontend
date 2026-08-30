import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { useAuth } from './useAuth';

export function useAdvisorProjects() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['advisor-projects', user?.id],
    queryFn: async () => {
      const projects = await projectService.getAll();
      return projects.filter((project) => project.advisor_id === user!.id);
    },
    enabled: !!user,
  });
}
