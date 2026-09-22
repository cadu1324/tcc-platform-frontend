import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from './useAuth';
import type { RegisterData } from '../types';

export function useRegister() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      setSession(data.user, data.access_token, data.refresh_token);
    },
  });
}
