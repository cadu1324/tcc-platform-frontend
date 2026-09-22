import { apiGet, apiPut } from './httpClient';
import type { NotificationSettings, UpdateNotificationSettingsData } from '../types';

export const notificationSettingsService = {
  get: () => apiGet<NotificationSettings>('/notification-settings'),
  update: (payload: UpdateNotificationSettingsData) =>
    apiPut<NotificationSettings>('/notification-settings', payload),
};
