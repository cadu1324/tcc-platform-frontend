import { useQuery } from '@tanstack/react-query';
import { messageService } from '../services/messageService';
import { useAuth } from './useAuth';

export function useMessageContacts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['message-contacts', user?.id],
    queryFn: () => messageService.getContacts(),
    enabled: !!user,
    refetchInterval: 15000,
  });
}
