import { useQuery } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';

export function useDeliveryById(deliveryId: string | undefined) {
  return useQuery({
    queryKey: ['delivery', deliveryId],
    queryFn: () => deliveryService.getById(deliveryId!),
    enabled: !!deliveryId,
  });
}
