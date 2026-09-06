import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAdvisorDashboard } from '../../../hooks/useAdvisorDashboard';
import { Layout } from '../../../components/layout';
import { Card, CardContent, StatCard, Badge, Spinner } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import type { Delivery, Milestone } from '../../../types';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  StatsGrid,
  ContentGrid,
  SectionTitle,
  DeliveryRow,
  DeliveryInfo,
  DeliveryTitle,
  DeliveryMeta,
  MilestoneRow,
  MilestoneDot,
  MilestoneInfo,
  MilestoneTitle,
  MilestoneDate,
  EmptyText,
} from './Dashboard.styles';

function AwaitingDeliveryItem({ delivery, onReview }: { delivery: Delivery; onReview: (id: number) => void }) {
  return (
    <DeliveryRow onClick={() => onReview(delivery.id)}>
      <DeliveryInfo>
        <DeliveryTitle>{delivery.title}</DeliveryTitle>
        <DeliveryMeta>
          Enviada: {formatDate(delivery.submitted_at)} · Prazo: {formatDate(delivery.deadline)}
        </DeliveryMeta>
      </DeliveryInfo>
      <Badge variant="warning" size="sm">Aguardando</Badge>
    </DeliveryRow>
  );
}

function OverdueMilestoneItem({
  milestone,
  onOpen,
}: {
  milestone: Milestone;
  onOpen: (projectId: number) => void;
}) {
  return (
    <MilestoneRow onClick={() => onOpen(milestone.project_id)}>
      <MilestoneDot />
      <MilestoneInfo>
        <MilestoneTitle>{milestone.title}</MilestoneTitle>
        {milestone.due_date && (
          <MilestoneDate>Prazo expirou: {formatDate(milestone.due_date)}</MilestoneDate>
        )}
      </MilestoneInfo>
      <Badge variant="error" size="sm">Atrasado</Badge>
    </MilestoneRow>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useAdvisorDashboard();
  const navigate = useNavigate();

  if (isLoading) {
    return <Layout><DashboardContainer><Spinner size="lg" /></DashboardContainer></Layout>;
  }

  const awaitingDeliveries = data?.deliveries_awaiting_feedback ?? [];
  const overdueMilestones = data?.overdue_milestones ?? [];
  const totalProjects = (data?.projects.in_progress ?? 0) + (data?.projects.completed ?? 0);

  return (
    <Layout>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Olá, {user?.name}</DashboardTitle>
          <DashboardSubtitle>Gerencie seus orientandos e avalie as entregas</DashboardSubtitle>
        </DashboardHeader>

        <StatsGrid>
          <StatCard
            value={data?.projects.in_progress ?? 0}
            label="Orientandos ativos"
            badge={{ text: `${totalProjects} total`, variant: 'info' }}
          />
          <StatCard
            value={awaitingDeliveries.length}
            label="Entregas p/ revisar"
            badge={awaitingDeliveries.length > 0 ? { text: 'pendentes', variant: 'warning' } : undefined}
          />
          <StatCard
            value={overdueMilestones.length}
            label="Marcos atrasados"
            badge={overdueMilestones.length > 0 ? { text: 'atenção', variant: 'error' } : { text: 'ok', variant: 'success' }}
          />
          <StatCard
            value={data?.unread_notifications ?? 0}
            label="Notificações"
            badge={data?.unread_notifications ? { text: 'novas', variant: 'info' } : undefined}
          />
        </StatsGrid>

        <ContentGrid>
          <Card>
            <CardContent>
              <SectionTitle>Entregas para revisar</SectionTitle>
              {awaitingDeliveries.length === 0 ? (
                <EmptyText>Nenhuma entrega aguardando revisão</EmptyText>
              ) : (
                awaitingDeliveries.slice(0, 6).map((d) => (
                  <AwaitingDeliveryItem
                    key={d.id}
                    delivery={d}
                    onReview={(id) => navigate(`/advisor/review/${id}`)}
                  />
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionTitle>Marcos atrasados</SectionTitle>
              {overdueMilestones.length === 0 ? (
                <EmptyText>Nenhum marco atrasado</EmptyText>
              ) : (
                overdueMilestones.slice(0, 5).map((m) => (
                  <OverdueMilestoneItem
                    key={m.id}
                    milestone={m}
                    onOpen={(projectId) => navigate(`/advisor/students/${projectId}`)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </ContentGrid>
      </DashboardContainer>
    </Layout>
  );
}
