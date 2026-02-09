import { Layout } from '../../../components/layout';
import { useAuth } from '../../../hooks/useAuth';
import { DashboardContainer, DashboardTitle } from './Dashboard.styles';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <DashboardContainer>
        <DashboardTitle>
          Olá, {user?.name}
        </DashboardTitle>

        {/* TODO: Adicionar cards de estatísticas e gestão */}
        <p>Dashboard do administrador - em desenvolvimento.</p>
      </DashboardContainer>
    </Layout>
  );
}
