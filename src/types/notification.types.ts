export const NotificationType = {
  DELIVERY_CREATED: 'delivery_created',
  FEEDBACK_REGISTERED: 'feedback_registered',
  MILESTONE_CREATED: 'milestone_created',
  MILESTONE_UPDATED: 'milestone_updated',
  MESSAGE_RECEIVED: 'message_received',
  MILESTONE_DUE_SOON: 'milestone_due_soon',
  MILESTONE_OVERDUE: 'milestone_overdue',
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

export const EmailDigestFrequency = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
} as const;
export type EmailDigestFrequency = (typeof EmailDigestFrequency)[keyof typeof EmailDigestFrequency];

export interface NotificationSettings {
  id: number;
  notify_student_on_feedback: boolean;
  notify_advisor_on_delivery_submitted: boolean;
  notify_admin_on_milestone_overdue: boolean;
  email_copy_enabled: boolean;
  email_digest_frequency: EmailDigestFrequency;
  updated_at: string;
}

export type UpdateNotificationSettingsData = Partial<
  Omit<NotificationSettings, 'id' | 'updated_at'>
>;
