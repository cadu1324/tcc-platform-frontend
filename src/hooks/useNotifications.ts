import { useQuery } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';
import { useAuth } from './useAuth';

const POLL_INTERVAL_MS = 30_000;

export function useNotifications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => notificationService.getMine(),
    enabled: !!user,
    refetchInterval: POLL_INTERVAL_MS,
  });
}
