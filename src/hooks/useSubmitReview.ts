import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackService } from '../services/feedbackService';
import type { DeliveryStatus } from '../types';

interface ReviewPayload {
  deliveryId: number;
  status: typeof DeliveryStatus.APPROVED | typeof DeliveryStatus.REJECTED;
  comment: string;
  grade: number;
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deliveryId, status, comment, grade }: ReviewPayload) =>
      feedbackService.create({ delivery_id: deliveryId, comment, grade, status }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['delivery', variables.deliveryId.toString()] });
      void queryClient.invalidateQueries({ queryKey: ['advisor-dashboard'] });
    },
  });
}
