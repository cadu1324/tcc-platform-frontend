import { useState } from 'react';
import { Badge, Button, Modal } from '../../../ui';
import { MilestoneStatusButton, MilestoneFormDialog } from '../../../components/milestone';
import { useDeleteMilestone } from '../../../hooks/useDeleteMilestone';
import { formatDate } from '../../../utils/formatDate';
import {
  getMilestoneUrgency,
  milestoneUrgencyBadgeVariant,
  milestoneUrgencyLabel,
} from '../../../utils/milestoneUrgency';
import { MilestoneStatus } from '../../../types';
import type { Milestone } from '../../../types';
import { Row, RowInfo, RowTitle, RowMeta, RowActions, ConfirmText } from './AdvisorProjectDetail.styles';

interface MilestoneRowProps {
  milestone: Milestone;
  projectId: number;
}

export function MilestoneRow({ milestone, projectId }: MilestoneRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const { mutate: deleteMilestone, isPending: isDeleting } = useDeleteMilestone();

  const isDone = milestone.status === MilestoneStatus.COMPLETED;
  const urgency = getMilestoneUrgency(milestone);
  const isOverdue = urgency === 'overdue';

  function confirmDelete() {
    deleteMilestone(
      { id: milestone.id, projectId },
      { onSuccess: () => setIsConfirmingDelete(false) },
    );
  }

  return (
    <Row>
      <RowInfo>
        <RowTitle>{milestone.title}</RowTitle>
        {milestone.due_date && (
          <RowMeta>
            {isDone ? 'Concluído' : isOverdue ? 'Prazo expirou' : 'Prazo'}:{' '}
            {formatDate(milestone.due_date)}
          </RowMeta>
        )}
      </RowInfo>

      <Badge variant={milestoneUrgencyBadgeVariant[urgency]} size="sm">
        {milestoneUrgencyLabel[urgency]}
      </Badge>

      <RowActions>
        <MilestoneStatusButton milestone={milestone} projectId={projectId} />
        <MilestoneFormDialog
          key={`edit-${milestone.id}-${isEditing}`}
          mode="edit"
          projectId={projectId}
          milestone={milestone}
          isOpen={isEditing}
          onOpenChange={setIsEditing}
          triggerLabel="Editar"
          triggerVariant="ghost"
          triggerSize="sm"
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setIsConfirmingDelete(true)}
        >
          Excluir
        </Button>
      </RowActions>

      <Modal
        isOpen={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        title="Excluir marco"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsConfirmingDelete(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </>
        }
      >
        <ConfirmText>
          Excluir o marco <strong>{milestone.title}</strong>? Esta ação não pode ser desfeita.
        </ConfirmText>
      </Modal>
    </Row>
  );
}
