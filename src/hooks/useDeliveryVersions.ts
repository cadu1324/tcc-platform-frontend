import { useQuery } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';

export function useDeliveryVersions(deliveryId: number | undefined) {
  return useQuery({
    queryKey: ['delivery-versions', deliveryId],
    queryFn: () => deliveryService.getVersions(deliveryId!),
    enabled: !!deliveryId,
  });
}
