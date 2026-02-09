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

        {/* TODO: Adicionar cards de resumo e lista de projetos */}
        <p>Dashboard do aluno - em desenvolvimento.</p>
      </DashboardContainer>
    </Layout>
  );
}
