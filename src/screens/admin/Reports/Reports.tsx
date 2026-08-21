import { useAdminDashboard } from '../../../hooks/useAdminDashboard';
import { Layout } from '../../../components/layout';
import { Card, CardContent, StatCard, Spinner, ProgressBar } from '../../../ui';
import {
  ReportsContainer,
  ReportsHeader,
  ReportsTitle,
  ReportsSubtitle,
  SectionTitle,
  StatsGrid,
  SummaryGrid,
  MetricRow,
  MetricLabel,
  MetricValue,
} from './Reports.styles';

export function Reports() {
  const { data, isLoading } = useAdminDashboard();

  const totalProjects = data
    ? data.projects.in_progress + data.projects.completed + data.projects.cancelled
    : 0;

  const totalDeliveries = data
    ? data.deliveries.pending + data.deliveries.submitted + data.deliveries.approved + data.deliveries.rejected
    : 0;

  const approvedPct = totalDeliveries > 0
    ? Math.round((data!.deliveries.approved / totalDeliveries) * 100)
    : 0;

  const completedProjectPct = totalProjects > 0
    ? Math.round((data!.projects.completed / totalProjects) * 100)
    : 0;

  return (
    <Layout>
      <ReportsContainer>
        <ReportsHeader>
          <ReportsTitle>Relatórios</ReportsTitle>
          <ReportsSubtitle>Indicadores gerais da plataforma</ReportsSubtitle>
        </ReportsHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <StatsGrid>
              <StatCard
                value={data ? data.users.student + data.users.advisor + data.users.admin : 0}
                label="Usuários"
              />
              <StatCard value={totalProjects} label="Projetos" />
              <StatCard value={totalDeliveries} label="Entregas" />
              <StatCard value={data?.deliveries.approved ?? 0} label="Entregas aprovadas" />
            </StatsGrid>

            <SummaryGrid>
              <Card>
                <CardContent>
                  <SectionTitle>Projetos</SectionTitle>
                  <MetricRow>
                    <MetricLabel>Em andamento</MetricLabel>
                    <MetricValue>{data?.projects.in_progress ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Concluídos</MetricLabel>
                    <MetricValue>{data?.projects.completed ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Cancelados</MetricLabel>
                    <MetricValue>{data?.projects.cancelled ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Taxa de conclusão</MetricLabel>
                    <MetricValue>{completedProjectPct}%</MetricValue>
                  </MetricRow>
                  <ProgressBar value={completedProjectPct} variant="medium" color="success" />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <SectionTitle>Entregas</SectionTitle>
                  <MetricRow>
                    <MetricLabel>Pendentes</MetricLabel>
                    <MetricValue>{data?.deliveries.pending ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Aguardando revisão</MetricLabel>
                    <MetricValue>{data?.deliveries.submitted ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Aprovadas</MetricLabel>
                    <MetricValue>{data?.deliveries.approved ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Devolvidas</MetricLabel>
                    <MetricValue>{data?.deliveries.rejected ?? 0}</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Taxa de aprovação</MetricLabel>
                    <MetricValue>{approvedPct}%</MetricValue>
                  </MetricRow>
                  <ProgressBar value={approvedPct} variant="medium" color="primary" />
                </CardContent>
              </Card>
            </SummaryGrid>
          </>
        )}
      </ReportsContainer>
    </Layout>
  );
}
