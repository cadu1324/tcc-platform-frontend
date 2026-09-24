import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';

interface CreateDeliveryArgs {
  projectId: number;
  milestoneId: number;
  title: string;
  description: string;
}

export function useCreateDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, milestoneId, title, description }: CreateDeliveryArgs) =>
      deliveryService.create({
        project_id: projectId,
        milestone_id: milestoneId,
        title,
        description,
      }),
    onSuccess: (_data, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-deliveries', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
