import { useMutation, useQueryClient } from '@tanstack/react-query';
import { milestoneService } from '../services/milestoneService';

interface CreateMilestoneArgs {
  projectId: number;
  title: string;
  description?: string;
  due_date?: string;
}

export function useCreateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, title, description, due_date }: CreateMilestoneArgs) =>
      milestoneService.create({ project_id: projectId, title, description, due_date }),
    onSuccess: (_result, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-milestones', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['advisor-dashboard'] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
