export const NotificationType = {
  DELIVERY_CREATED: 'delivery_created',
  FEEDBACK_REGISTERED: 'feedback_registered',
  MILESTONE_CREATED: 'milestone_created',
  MILESTONE_UPDATED: 'milestone_updated',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  message: string;
  project_id: number | null;
  is_read: boolean;
  created_at: string;
}
