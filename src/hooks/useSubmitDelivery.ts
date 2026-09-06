import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';

interface SubmitDeliveryPayload {
  deliveryId: number;
  projectId: number;
  file: File;
}

export function useSubmitDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deliveryId, file }: SubmitDeliveryPayload) =>
      deliveryService.submitWithFile(deliveryId, file),
    onSuccess: (_data, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-deliveries', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
