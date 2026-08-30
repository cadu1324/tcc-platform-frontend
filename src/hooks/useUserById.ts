import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export function useUserById(id: string | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(Number(id)),
    enabled: !!id,
  });
}
