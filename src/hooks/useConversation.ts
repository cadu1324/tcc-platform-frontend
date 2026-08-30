import { useQuery } from '@tanstack/react-query';
import { messageService } from '../services/messageService';

export function useConversation(userId: number | null) {
  return useQuery({
    queryKey: ['conversation', userId],
    queryFn: () => messageService.getConversation(userId!),
    enabled: userId !== null,
    refetchInterval: 5000,
  });
}
