import type { UserType } from './user.types';

export interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface MessageContact {
  user_id: number;
  name: string;
  user_type: UserType;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
}

export interface SendMessageData {
  recipient_id: number;
  content: string;
}
