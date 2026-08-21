import { useAuth } from '../../../hooks/useAuth';
import { useStudentDashboard } from '../../../hooks/useStudentDashboard';
import { Layout } from '../../../components/layout';
import { Card, CardContent, StatCard, Timeline, Avatar, Badge, Spinner } from '../../../ui';
import { formatDate, daysUntil } from '../../../utils/formatDate';
import type { Milestone, Feedback } from '../../../types';
import type { TimelineStep } from '../../../ui';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  StatsGrid,
  ContentGrid,
  SectionTitle,
  MilestoneRow,
  MilestoneDot,
  MilestoneContent,
  MilestoneTitle,
  MilestoneDate,
  FeedbackMeta,
  FeedbackComment,
  EmptyText,
} from './Dashboard.styles';

const milestoneColor: Record<string, string> = {
  completed: '#22c55e',
  pending: '#f59e0b',
};

function UpcomingMilestoneItem({ milestone }: { milestone: Milestone }) {
  const days = daysUntil(milestone.due_date);
  const isLate = days !== null && days < 0;
  const isSoon = days !== null && days >= 0 && days <= 7;
  const badgeVariant = milestone.status === 'completed' ? 'success' : isLate ? 'error' : isSoon ? 'warning' : 'info';
  const badgeText = milestone.status === 'completed' ? 'Entregue' : isLate ? 'Atrasado' : days !== null ? `${days}d` : 'Sem prazo';

  return (
    <MilestoneRow>
      <MilestoneDot $color={milestoneColor[milestone.status] ?? '#94a3b8'} />
      <MilestoneContent>
        <MilestoneTitle>{milestone.title}</MilestoneTitle>
        {milestone.due_date && (
          <MilestoneDate>Prazo: {formatDate(milestone.due_date)}</MilestoneDate>
        )}
      </MilestoneContent>
      <Badge variant={badgeVariant} size="sm">{badgeText}</Badge>
    </MilestoneRow>
  );
}

function LastFeedbackCard({ feedback }: { feedback: Feedback }) {
  const isApproved = feedback.grade >= 7;
  return (
    <>
      <FeedbackMeta>
        <Avatar name="Orientador" size="sm" scheme="blue" />
        <span>Orientador</span>
        <Badge variant={isApproved ? 'success' : 'warning'} size="sm">
          {isApproved ? 'Aprovado' : 'Revisão'}
        </Badge>
      </FeedbackMeta>
      <FeedbackComment>{feedback.comment}</FeedbackComment>
    </>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useStudentDashboard();

  if (isLoading) {
    return <Layout><DashboardContainer><Spinner size="lg" /></DashboardContainer></Layout>;
  }

  const milestonesTotal = (data?.milestones.pending ?? 0) + (data?.milestones.completed ?? 0);
  const milestonesCompleted = data?.milestones.completed ?? 0;
  const progress = milestonesTotal > 0 ? Math.round((milestonesCompleted / milestonesTotal) * 100) : 0;

  const upcomingMilestones = data?.upcoming_milestones ?? [];
  const nextPending = upcomingMilestones.find((m) => m.status === 'pending');
  const daysToNext = nextPending ? daysUntil(nextPending.due_date) : null;

  const recentFeedbacks = data?.recent_feedbacks ?? [];
  const lastFeedback = recentFeedbacks[0];

  const firstPendingIndex = upcomingMilestones.findIndex((m) => m.status === 'pending');
  const timelineSteps: TimelineStep[] = upcomingMilestones.map((m, i) => ({
    label: m.title,
    status: m.status === 'completed' ? 'done' : i === firstPendingIndex ? 'active' : 'pending',
  }));

  return (
    <Layout>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Olá, {user?.name}</DashboardTitle>
          <DashboardSubtitle>Acompanhe o progresso do seu TCC</DashboardSubtitle>
        </DashboardHeader>

        <StatsGrid>
          <StatCard value={`${progress}%`} label="Progresso geral" progress={progress} />
          <StatCard
            value={`${milestonesCompleted}/${milestonesTotal}`}
            label="Marcos concluídos"
            badge={{ text: 'no prazo', variant: 'success' }}
          />
          <StatCard
            value={recentFeedbacks.length}
            label="Feedbacks recentes"
            badge={recentFeedbacks.length > 0 ? { text: 'novos', variant: 'warning' } : undefined}
          />
          <StatCard
            value={daysToNext !== null ? Math.abs(daysToNext) : '—'}
            label="Dias p/ próxima entrega"
            badge={
              daysToNext !== null
                ? { text: daysToNext < 0 ? 'atrasado' : daysToNext <= 7 ? 'atenção' : 'no prazo', variant: daysToNext < 0 ? 'error' : daysToNext <= 7 ? 'warning' : 'info' }
                : undefined
            }
          />
        </StatsGrid>

        <ContentGrid>
          <Card>
            <CardContent>
              <SectionTitle>Próximas entregas</SectionTitle>
              {upcomingMilestones.length === 0 ? (
                <EmptyText>Nenhum marco pendente</EmptyText>
              ) : (
                upcomingMilestones.slice(0, 5).map((m) => <UpcomingMilestoneItem key={m.id} milestone={m} />)
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionTitle>Último feedback</SectionTitle>
              {lastFeedback ? <LastFeedbackCard feedback={lastFeedback} /> : <EmptyText>Nenhum feedback recebido</EmptyText>}
            </CardContent>
          </Card>
        </ContentGrid>

        {timelineSteps.length > 0 && (
          <Card>
            <CardContent>
              <SectionTitle>Linha do tempo do projeto</SectionTitle>
              <Timeline steps={timelineSteps} />
            </CardContent>
          </Card>
        )}
      </DashboardContainer>
    </Layout>
  );
}
