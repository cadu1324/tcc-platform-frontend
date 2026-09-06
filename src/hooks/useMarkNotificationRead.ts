import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';
import { useAuth } from './useAuth';

const DASHBOARD_KEYS = ['student-dashboard', 'advisor-dashboard', 'admin-dashboard'] as const;

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  function invalidate() {
    void queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    DASHBOARD_KEYS.forEach((key) => {
      void queryClient.invalidateQueries({ queryKey: [key, user?.id] });
    });
  }

  return useMutation({
    mutationFn: (ids: number | number[]) => {
      const list = Array.isArray(ids) ? ids : [ids];
      return Promise.all(list.map((id) => notificationService.markAsRead(id)));
    },
    onSuccess: invalidate,
  });
}
