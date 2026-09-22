import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationSettingsService } from '../services/notificationSettingsService';
import type { UpdateNotificationSettingsData } from '../types';

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateNotificationSettingsData) => notificationSettingsService.update(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
    },
  });
}
