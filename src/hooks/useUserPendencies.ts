import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { deliveryService } from '../services/deliveryService';
import { milestoneService } from '../services/milestoneService';
import { daysUntil } from '../utils/formatDate';
import { DeliveryStatus, MilestoneStatus, UserType } from '../types';
import type { User, Delivery, Milestone } from '../types';

export interface UserPendencies {
  overdueMilestones: Milestone[];
  pendingDeliveries: Delivery[];
  awaitingReviewDeliveries: Delivery[];
}

const EMPTY: UserPendencies = {
  overdueMilestones: [],
  pendingDeliveries: [],
  awaitingReviewDeliveries: [],
};

function isOverdue(dueDate: string | null): boolean {
  const days = daysUntil(dueDate);
  return days !== null && days < 0;
}

export function useUserPendencies(user: User | undefined) {
  return useQuery({
    queryKey: ['user-pendencies', user?.id],
    enabled: !!user,
    queryFn: async (): Promise<UserPendencies> => {
      if (!user || user.user_type === UserType.ADMIN) return EMPTY;

      const projects = await projectService.getAll();
      const owned =
        user.user_type === UserType.STUDENT
          ? projects.filter((project) => project.student_id === user.id)
          : projects.filter((project) => project.advisor_id === user.id);

      if (owned.length === 0) return EMPTY;

      const [deliveryGroups, milestoneGroups] = await Promise.all([
        Promise.all(owned.map((project) => deliveryService.getByProject(project.id))),
        Promise.all(owned.map((project) => milestoneService.getByProject(project.id))),
      ]);

      const deliveries = deliveryGroups.flat();
      const milestones = milestoneGroups.flat();

      return {
        overdueMilestones: milestones.filter(
          (milestone) =>
            milestone.status === MilestoneStatus.PENDING && isOverdue(milestone.due_date),
        ),
        pendingDeliveries: deliveries.filter(
          (delivery) => delivery.status === DeliveryStatus.PENDING,
        ),
        awaitingReviewDeliveries: deliveries.filter(
          (delivery) => delivery.status === DeliveryStatus.SUBMITTED,
        ),
      };
    },
  });
}
