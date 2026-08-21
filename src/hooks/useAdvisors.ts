import { useQuery } from '@tanstack/react-query';
import { userService } from '../services';

export function useAdvisors() {
  return useQuery({
    queryKey: ['advisors'],
    queryFn: () => userService.getAdvisors(),
  });
}
