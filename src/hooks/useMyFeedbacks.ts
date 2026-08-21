import { useQuery } from '@tanstack/react-query';
import { feedbackService } from '../services/feedbackService';
import { useAuth } from './useAuth';

export function useMyFeedbacks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-feedbacks', user?.id],
    queryFn: () => feedbackService.getMyFeedbacks(),
    enabled: !!user,
  });
}
