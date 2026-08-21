import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { useAuth } from './useAuth';

export function useMyProject() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-project', user?.id],
    queryFn: async () => {
      const projects = await projectService.getByStudent(user!.id.toString());
      return projects[0] ?? null;
    },
    enabled: !!user,
  });
}
