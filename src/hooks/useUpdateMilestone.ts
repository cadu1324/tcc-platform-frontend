import { useMutation, useQueryClient } from '@tanstack/react-query';
import { milestoneService } from '../services/milestoneService';
import type { UpdateMilestoneData } from '../types';

interface UpdateMilestoneArgs {
  id: number;
  projectId: number;
  data: UpdateMilestoneData;
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateMilestoneArgs) => milestoneService.update(id, data),
    onSuccess: (_result, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-milestones', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['advisor-dashboard'] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
