import { useMutation, useQueryClient } from '@tanstack/react-query';
import { milestoneService } from '../services/milestoneService';

interface DeleteMilestoneArgs {
  id: number;
  projectId: number;
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: DeleteMilestoneArgs) => milestoneService.remove(id),
    onSuccess: (_result, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-milestones', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['advisor-dashboard'] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
