import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

interface ResetPasswordArgs {
  token: string;
  password: string;
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (args: ResetPasswordArgs) => authService.resetPassword(args),
  });
}
