import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';

export function useProjectById(id: string | undefined) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(Number(id)),
    enabled: !!id,
  });
}
