import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuth } from './useAuth';
import type { LoginCredentials } from '../types';

export function useLogin() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setSession(data.user, data.token);
    },
  });
}
