import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { UserType } from '../types';

export function useAdvisors() {
  return useQuery({
    queryKey: ['advisors'],
    queryFn: async () => {
      const users = await userService.getAll();
      return users.filter((user) => user.user_type === UserType.ADVISOR);
    },
  });
}
