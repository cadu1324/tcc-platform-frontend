import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuth } from './useAuth';
import type { RegisterData } from '../types';

export function useRegister() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      setSession(data.user, data.token);
    },
  });
}
