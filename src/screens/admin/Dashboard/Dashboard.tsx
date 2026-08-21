import { useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../../../hooks/useAdminDashboard';
import { useAuth } from '../../../hooks/useAuth';
import { Layout } from '../../../components/layout';
import { Card, CardContent, StatCard, Spinner, Button } from '../../../ui';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  SectionTitle,
  StatsGrid,
  ContentGrid,
  AlertRow,
  AlertLabel,
  AlertCount,
  NeutralCount,
  ButtonRow,
  EmptyText,
} from './Dashboard.styles';

export function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useAdminDashboard();
  const navigate = useNavigate();

  const totalUsers = data ? data.users.student + data.users.advisor + data.users.admin : 0;
  const totalProjects = data
    ? data.projects.in_progress + data.projects.completed + data.projects.cancelled
    : 0;

  return (
    <Layout>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Olá, {user?.name}</DashboardTitle>
          <DashboardSubtitle>Visão geral da plataforma</DashboardSubtitle>
        </DashboardHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <StatsGrid>
              <StatCard value={totalUsers} label="Usuários totais" />
              <StatCard value={totalProjects} label="Projetos cadastrados" />
              <StatCard value={data?.projects_without_advisor ?? 0} label="Projetos sem orientador" />
              <StatCard value={data?.overdue_milestones_count ?? 0} label="Marcos atrasados" />
            </StatsGrid>

            <ContentGrid>
              <Card>
                <CardContent>
                  <SectionTitle>Usuários por tipo</SectionTitle>
                  <AlertRow>
                    <AlertLabel>Alunos</AlertLabel>
                    <NeutralCount>{data?.users.student ?? 0}</NeutralCount>
                  </AlertRow>
                  <AlertRow>
                    <AlertLabel>Orientadores</AlertLabel>
                    <NeutralCount>{data?.users.advisor ?? 0}</NeutralCount>
                  </AlertRow>
                  <AlertRow>
                    <AlertLabel>Administradores</AlertLabel>
                    <NeutralCount>{data?.users.admin ?? 0}</NeutralCount>
                  </AlertRow>
                  <ButtonRow>
                    <Button variant="outline" fullWidth onClick={() => navigate('/admin/users')}>
                      Gerenciar usuários
                    </Button>
                  </ButtonRow>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <SectionTitle>Alertas</SectionTitle>
                  {(data?.projects_without_advisor ?? 0) > 0 && (
                    <AlertRow>
                      <AlertLabel>Projetos sem orientador</AlertLabel>
                      <AlertCount>{data?.projects_without_advisor}</AlertCount>
                    </AlertRow>
                  )}
                  {(data?.overdue_milestones_count ?? 0) > 0 && (
                    <AlertRow>
                      <AlertLabel>Marcos com prazo vencido</AlertLabel>
                      <AlertCount>{data?.overdue_milestones_count}</AlertCount>
                    </AlertRow>
                  )}
                  {(data?.projects_without_advisor ?? 0) === 0 &&
                    (data?.overdue_milestones_count ?? 0) === 0 && (
                      <EmptyText>Nenhum alerta no momento.</EmptyText>
                    )}
                  <ButtonRow>
                    <Button variant="outline" fullWidth onClick={() => navigate('/admin/reports')}>
                      Ver relatórios
                    </Button>
                  </ButtonRow>
                </CardContent>
              </Card>
            </ContentGrid>
          </>
        )}
      </DashboardContainer>
    </Layout>
  );
}
