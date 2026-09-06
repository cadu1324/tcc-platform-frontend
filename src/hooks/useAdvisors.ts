import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export function useAdvisors() {
  return useQuery({
    queryKey: ['advisors'],
    queryFn: () => userService.getAdvisors(),
  });
}
