import { useQuery } from '@tanstack/react-query';
import { notificationSettingsService } from '../services/notificationSettingsService';

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['notification-settings'],
    queryFn: notificationSettingsService.get,
  });
}
