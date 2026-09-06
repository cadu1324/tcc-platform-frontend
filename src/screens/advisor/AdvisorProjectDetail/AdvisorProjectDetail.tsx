import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/layout';
import { MilestoneFormDialog } from '../../../components/milestone';
import { Card, CardContent, Badge, Button, Spinner } from '../../../ui';
import { useProjectById } from '../../../hooks/useProjectById';
import { useUserById } from '../../../hooks/useUserById';
import { useProjectMilestones } from '../../../hooks/useProjectMilestones';
import { useProjectDeliveries } from '../../../hooks/useProjectDeliveries';
import { formatDate } from '../../../utils/formatDate';
import type { ProjectStatus, DeliveryStatus } from '../../../types';
import { MilestoneRow } from './MilestoneRow';
import {
  Container,
  BackRow,
  PageHeader,
  PageTitle,
  StudentLine,
  SectionHeader,
  SectionTitle,
  RowList,
  Row,
  RowInfo,
  RowTitle,
  RowMeta,
  RowActions,
  EmptyText,
} from './AdvisorProjectDetail.styles';

const projectStatusLabel: Record<ProjectStatus, string> = {
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const projectStatusVariant: Record<ProjectStatus, 'info' | 'success' | 'error'> = {
  in_progress: 'info',
  completed: 'success',
  cancelled: 'error',
};

const deliveryStatusLabel: Record<DeliveryStatus, string> = {
  pending: 'Pendente',
  submitted: 'Aguardando revisão',
  approved: 'Aprovada',
  rejected: 'Devolvida',
};

const deliveryStatusVariant: Record<DeliveryStatus, 'warning' | 'info' | 'success' | 'error'> = {
  pending: 'info',
  submitted: 'warning',
  approved: 'success',
  rejected: 'error',
};

export function AdvisorProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);

  const { data: project, isLoading: projectLoading } = useProjectById(projectId);
  const { data: student } = useUserById(project ? String(project.student_id) : undefined);
  const { data: milestones, isLoading: milestonesLoading } = useProjectMilestones(project?.id);
  const { data: deliveries, isLoading: deliveriesLoading } = useProjectDeliveries(project?.id);

  if (projectLoading) {
    return (
      <Layout>
        <Container>
          <Spinner size="lg" />
        </Container>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <Container>
          <BackRow onClick={() => navigate('/advisor/students')}>← Voltar para orientandos</BackRow>
          <EmptyText>Projeto não encontrado.</EmptyText>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <BackRow onClick={() => navigate('/advisor/students')}>← Voltar para orientandos</BackRow>

        <PageHeader>
          <PageTitle>{project.title}</PageTitle>
          <Badge variant={projectStatusVariant[project.status]}>
            {projectStatusLabel[project.status]}
          </Badge>
        </PageHeader>
        <StudentLine>
          Orientando: {student ? student.name : `#${project.student_id}`}
          {project.expected_delivery_date && ` · Entrega prevista: ${formatDate(project.expected_delivery_date)}`}
        </StudentLine>

        <Card>
          <CardContent>
            <SectionHeader>
              <SectionTitle>Marcos</SectionTitle>
              <MilestoneFormDialog
                key={`create-${isCreatingMilestone}`}
                mode="create"
                projectId={project.id}
                isOpen={isCreatingMilestone}
                onOpenChange={setIsCreatingMilestone}
                triggerLabel="Novo marco"
                triggerSize="sm"
              />
            </SectionHeader>

            {milestonesLoading ? (
              <Spinner size="md" />
            ) : !milestones || milestones.length === 0 ? (
              <EmptyText>Nenhum marco cadastrado.</EmptyText>
            ) : (
              <RowList>
                {milestones.map((milestone) => (
                  <MilestoneRow key={milestone.id} milestone={milestone} projectId={project.id} />
                ))}
              </RowList>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <SectionHeader>
              <SectionTitle>Entregas</SectionTitle>
            </SectionHeader>

            {deliveriesLoading ? (
              <Spinner size="md" />
            ) : !deliveries || deliveries.length === 0 ? (
              <EmptyText>Nenhuma entrega cadastrada.</EmptyText>
            ) : (
              <RowList>
                {deliveries.map((delivery) => (
                  <Row key={delivery.id}>
                    <RowInfo>
                      <RowTitle>{delivery.title}</RowTitle>
                      <RowMeta>Prazo: {formatDate(delivery.deadline)}</RowMeta>
                    </RowInfo>
                    <Badge variant={deliveryStatusVariant[delivery.status]} size="sm">
                      {deliveryStatusLabel[delivery.status]}
                    </Badge>
                    <RowActions>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/advisor/review/${delivery.id}`)}
                      >
                        {delivery.status === 'submitted' ? 'Revisar' : 'Ver'}
                      </Button>
                    </RowActions>
                  </Row>
                ))}
              </RowList>
            )}
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
