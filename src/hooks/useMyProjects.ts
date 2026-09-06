import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { useAuth } from './useAuth';
import { ProjectStatus } from '../types';

export function useMyProjects() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-projects', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const projects = await projectService.getAll();
      return projects
        .filter((project) => project.student_id === user!.id)
        .sort((a, b) => {
          const aActive = a.status === ProjectStatus.IN_PROGRESS;
          const bActive = b.status === ProjectStatus.IN_PROGRESS;
          if (aActive !== bActive) return aActive ? -1 : 1;
          return b.created_at.localeCompare(a.created_at);
        });
    },
  });
}
