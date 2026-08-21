import { useQuery } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';

export function useProjectDeliveries(projectId: number | undefined) {
  return useQuery({
    queryKey: ['project-deliveries', projectId],
    queryFn: () => deliveryService.getByProject(projectId!.toString()),
    enabled: projectId !== undefined,
  });
}
