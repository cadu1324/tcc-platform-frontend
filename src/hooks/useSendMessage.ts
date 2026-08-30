import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '../services/messageService';

interface SendMessageArgs {
  recipientId: number;
  content: string;
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipientId, content }: SendMessageArgs) =>
      messageService.send({ recipient_id: recipientId, content }),
    onSuccess: (_data, { recipientId }) => {
      void queryClient.invalidateQueries({ queryKey: ['conversation', recipientId] });
      void queryClient.invalidateQueries({ queryKey: ['message-contacts'] });
    },
  });
}
