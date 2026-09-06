import { useQuery } from '@tanstack/react-query';
import { messageService } from '../services/messageService';
import { useAuth } from './useAuth';

interface UseMessageContactsOptions {
  enabled?: boolean;
}

export function useMessageContacts({ enabled = true }: UseMessageContactsOptions = {}) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['message-contacts', user?.id],
    queryFn: () => messageService.getContacts(),
    enabled: !!user && enabled,
    refetchInterval: 15000,
  });
}
