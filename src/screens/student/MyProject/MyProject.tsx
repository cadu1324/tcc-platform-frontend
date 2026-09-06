import { useNavigate } from 'react-router-dom';
import { useMyProject } from '../../../hooks/useMyProject';
import { useProjectMilestones } from '../../../hooks/useProjectMilestones';
import { Layout } from '../../../components/layout';
import { CreateProjectDialog } from '../../../components/project';
import { MilestoneStatusButton } from '../../../components/milestone';
import { Card, CardContent, Badge, Button, Spinner } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import type { Milestone } from '../../../types';
import {
  MyProjectContainer,
  ProjectHeader,
  ProjectTitle,
  ProjectDescription,
  ProjectMeta,
  MetaItem,
  SectionTitle,
  MilestoneList,
  MilestoneRow,
  MilestoneDot,
  MilestoneContent,
  MilestoneName,
  MilestoneDate,
  ActionsRow,
  EmptyText,
} from './MyProject.styles';

const statusLabels: Record<string, string> = {
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const statusVariants: Record<string, 'info' | 'success' | 'error'> = {
  in_progress: 'info',
  completed: 'success',
  cancelled: 'error',
};

const milestoneColor: Record<string, string> = {
  completed: '#22c55e',
  pending: '#f59e0b',
};

function MilestoneItem({ milestone, projectId }: { milestone: Milestone; projectId: number }) {
  const label = milestone.status === 'completed' ? 'Concluído' : 'Pendente';
  return (
    <MilestoneRow>
      <MilestoneDot $color={milestoneColor[milestone.status] ?? '#94a3b8'} />
      <MilestoneContent>
        <MilestoneName>{milestone.title}</MilestoneName>
        {milestone.due_date && (
          <MilestoneDate>
            {milestone.status === 'completed' ? 'Concluído em:' : 'Prazo:'}{' '}
            {formatDate(milestone.due_date)}
          </MilestoneDate>
        )}
      </MilestoneContent>
      <Badge variant={milestone.status === 'completed' ? 'success' : 'warning'} size="sm">
        {label}
      </Badge>
      <MilestoneStatusButton milestone={milestone} projectId={projectId} />
    </MilestoneRow>
  );
}

export function MyProject() {
  const navigate = useNavigate();
  const { data: project, isLoading: projectLoading } = useMyProject();
  const { data: milestones, isLoading: milestonesLoading } = useProjectMilestones(project?.id);
  const isLoading = projectLoading || milestonesLoading;

  if (isLoading) {
    return <Layout><MyProjectContainer><Spinner size="lg" /></MyProjectContainer></Layout>;
  }

  if (!project) {
    return (
      <Layout>
        <MyProjectContainer>
          <Card>
            <CardContent>
              <SectionTitle>Comece seu TCC</SectionTitle>
              <EmptyText>
                Você ainda não possui um projeto cadastrado. Crie o seu para acompanhar marcos,
                entregas e feedbacks.
              </EmptyText>
              <CreateProjectDialog />
            </CardContent>
          </Card>
        </MyProjectContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <MyProjectContainer>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <Badge variant={statusVariants[project.status] ?? 'info'}>
            {statusLabels[project.status] ?? project.status}
          </Badge>
        </ProjectHeader>

        <ProjectDescription>{project.description}</ProjectDescription>

        <ProjectMeta>
          {project.start_date && <MetaItem>Início: {formatDate(project.start_date)}</MetaItem>}
          {project.expected_delivery_date && (
            <MetaItem>Entrega prevista: {formatDate(project.expected_delivery_date)}</MetaItem>
          )}
        </ProjectMeta>

        <Card>
          <CardContent>
            <SectionTitle>Marcos do projeto</SectionTitle>
            {!milestones || milestones.length === 0 ? (
              <EmptyText>Nenhum marco cadastrado</EmptyText>
            ) : (
              <MilestoneList>
                {milestones.map((m) => (
                  <MilestoneItem key={m.id} milestone={m} projectId={project.id} />
                ))}
              </MilestoneList>
            )}
          </CardContent>
        </Card>

        <ActionsRow>
          <Button onClick={() => navigate('/student/deliveries')}>Ver Entregas</Button>
          <Button variant="secondary" onClick={() => navigate('/student/feedbacks')}>
            Ver Feedbacks
          </Button>
        </ActionsRow>
      </MyProjectContainer>
    </Layout>
  );
}
