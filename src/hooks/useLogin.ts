import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from './useAuth';
import type { LoginCredentials } from '../types';

export function useLogin() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setSession(data.user, data.access_token, data.refresh_token);
    },
  });
}
