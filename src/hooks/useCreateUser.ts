import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { CreateUserData } from '../types';

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserData) => userService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
