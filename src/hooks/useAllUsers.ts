import { useQuery } from '@tanstack/react-query';
import { userService } from '../services';

export function useAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });
}
