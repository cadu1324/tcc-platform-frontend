import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';

export function useAllProjects() {
  return useQuery({
    queryKey: ['admin-projects'],
    queryFn: projectService.getAll,
  });
}
