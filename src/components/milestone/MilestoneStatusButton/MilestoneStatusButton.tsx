import { Button } from '../../../ui';
import type { ButtonProps } from '../../../ui';
import { useUpdateMilestone } from '../../../hooks/useUpdateMilestone';
import { MilestoneStatus } from '../../../types';
import type { Milestone } from '../../../types';

interface MilestoneStatusButtonProps {
  milestone: Milestone;
  projectId: number;
  size?: ButtonProps['size'];
}

export function MilestoneStatusButton({ milestone, projectId, size = 'sm' }: MilestoneStatusButtonProps) {
  const { mutate, isPending } = useUpdateMilestone();

  const isDone = milestone.status === MilestoneStatus.COMPLETED;
  const nextStatus = isDone ? MilestoneStatus.PENDING : MilestoneStatus.COMPLETED;

  return (
    <Button
      type="button"
      size={size}
      variant={isDone ? 'ghost' : 'primary'}
      disabled={isPending}
      onClick={() => mutate({ id: milestone.id, projectId, data: { status: nextStatus } })}
    >
      {isDone ? 'Reabrir' : 'Concluir'}
    </Button>
  );
}
