import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { deliveryService } from '../services/deliveryService';
import { feedbackService } from '../services/feedbackService';
import { userService } from '../services/userService';
import { useAuth } from './useAuth';
import type { FeedbackWithRelations } from '../types';

export function useMyFeedbacks() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-feedbacks', user?.id],
    enabled: !!user,
    queryFn: async (): Promise<FeedbackWithRelations[]> => {
      const projects = await projectService.getAll();
      const project = projects.find((p) => p.student_id === user!.id);
      if (!project) return [];

      const [advisor, deliveries] = await Promise.all([
        project.advisor_id ? userService.getById(project.advisor_id) : Promise.resolve(null),
        deliveryService.getByProject(project.id),
      ]);

      const perDelivery = await Promise.all(
        deliveries.map((delivery) =>
          feedbackService.getByDelivery(delivery.id).then((feedbacks) =>
            feedbacks.map((feedback) => ({
              ...feedback,
              advisor_name: advisor?.name ?? 'Orientador',
              delivery_title: delivery.title,
            })),
          ),
        ),
      );

      return perDelivery.flat().sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });
}
