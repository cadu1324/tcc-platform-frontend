import { apiGet, apiPost } from './httpClient';
import type { Message, MessageContact, SendMessageData } from '../types';

export const messageService = {
  getContacts: () => apiGet<MessageContact[]>('/messages/contacts'),
  getConversation: (userId: number) => apiGet<Message[]>(`/messages/${userId}`),
  send: (payload: SendMessageData) => apiPost<Message>('/messages', payload),
};
