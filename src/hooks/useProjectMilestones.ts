import { useQuery } from '@tanstack/react-query';
import { milestoneService } from '../services/milestoneService';

export function useProjectMilestones(projectId: number | undefined) {
  return useQuery({
    queryKey: ['project-milestones', projectId],
    queryFn: () => milestoneService.getByProject(projectId!),
    enabled: projectId !== undefined,
  });
}
