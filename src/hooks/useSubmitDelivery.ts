import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';
import { DeliveryStatus } from '../types';

interface SubmitDeliveryPayload {
  deliveryId: number;
  projectId: number;
  fileUrl: string;
}

export function useSubmitDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deliveryId, fileUrl }: SubmitDeliveryPayload) =>
      deliveryService.update(deliveryId, {
        status: DeliveryStatus.SUBMITTED,
        file_url: fileUrl,
        submitted_at: new Date().toISOString(),
      }),
    onSuccess: (_data, { projectId }) => {
      void queryClient.invalidateQueries({ queryKey: ['project-deliveries', projectId] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
    },
  });
}
