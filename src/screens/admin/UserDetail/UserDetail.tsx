import { useNavigate, useParams } from 'react-router-dom';
import { useUserById } from '../../../hooks/useUserById';
import { useUserPendencies } from '../../../hooks/useUserPendencies';
import { Layout } from '../../../components/layout';
import { Card, CardContent, Badge, Spinner } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import { UserType } from '../../../types';
import type { Delivery, Milestone } from '../../../types';
import {
  UserDetailContainer,
  BackRow,
  PageHeader,
  PageTitle,
  SectionTitle,
  MetaRow,
  MetaItem,
  PendenciesGrid,
  PendencyHeader,
  RowList,
  RowItem,
  RowTitle,
  RowSubtitle,
  EmptyText,
} from './UserDetail.styles';

type PendencyTone = 'error' | 'warning' | 'info';

interface PendencyRow {
  id: number;
  title: string;
  subtitle: string;
}

const roleLabels: Record<UserType, string> = {
  student: 'Aluno',
  advisor: 'Orientador',
  admin: 'Administrador',
};

const roleVariants: Record<UserType, PendencyTone> = {
  student: 'info',
  advisor: 'warning',
  admin: 'error',
};

function toMilestoneRows(milestones: Milestone[]): PendencyRow[] {
  return milestones.map((milestone) => ({
    id: milestone.id,
    title: milestone.title,
    subtitle: `Prazo: ${formatDate(milestone.due_date)}`,
  }));
}

function toDeliveryRows(deliveries: Delivery[]): PendencyRow[] {
  return deliveries.map((delivery) => ({
    id: delivery.id,
    title: delivery.title,
    subtitle: `Prazo: ${formatDate(delivery.deadline)}`,
  }));
}

function PendencyCard({ title, tone, rows }: { title: string; tone: PendencyTone; rows: PendencyRow[] }) {
  return (
    <Card>
      <CardContent>
        <PendencyHeader>
          <SectionTitle>{title}</SectionTitle>
          <Badge variant={tone} size="sm">{rows.length}</Badge>
        </PendencyHeader>
        {rows.length === 0 ? (
          <EmptyText>Nenhuma pendência</EmptyText>
        ) : (
          <RowList>
            {rows.map((row) => (
              <RowItem key={row.id}>
                <RowTitle>{row.title}</RowTitle>
                <RowSubtitle>{row.subtitle}</RowSubtitle>
              </RowItem>
            ))}
          </RowList>
        )}
      </CardContent>
    </Card>
  );
}

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUserById(userId);
  const { data: pendencies, isLoading: pendenciesLoading } = useUserPendencies(user);

  if (userLoading) {
    return (
      <Layout>
        <UserDetailContainer>
          <Spinner size="lg" />
        </UserDetailContainer>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <UserDetailContainer>
          <BackRow onClick={() => navigate('/admin/users')}>← Voltar para usuários</BackRow>
          <EmptyText>Usuário não encontrado.</EmptyText>
        </UserDetailContainer>
      </Layout>
    );
  }

  const isAdmin = user.user_type === UserType.ADMIN;

  return (
    <Layout>
      <UserDetailContainer>
        <BackRow onClick={() => navigate('/admin/users')}>← Voltar para usuários</BackRow>

        <PageHeader>
          <PageTitle>{user.name}</PageTitle>
          <Badge variant={roleVariants[user.user_type]}>{roleLabels[user.user_type]}</Badge>
        </PageHeader>

        <Card>
          <CardContent>
            <SectionTitle>Perfil</SectionTitle>
            <MetaRow>
              <MetaItem>E-mail: {user.email}</MetaItem>
              <MetaItem>Status: {user.is_active ? 'Ativo' : 'Inativo'}</MetaItem>
              <MetaItem>Cadastro: {formatDate(user.created_at)}</MetaItem>
            </MetaRow>
          </CardContent>
        </Card>

        {isAdmin ? (
          <EmptyText>Administradores não possuem pendências de projeto.</EmptyText>
        ) : pendenciesLoading ? (
          <Spinner size="md" />
        ) : (
          <PendenciesGrid>
            <PendencyCard
              title="Marcos atrasados"
              tone="error"
              rows={toMilestoneRows(pendencies?.overdueMilestones ?? [])}
            />
            <PendencyCard
              title="Entregas pendentes"
              tone="warning"
              rows={toDeliveryRows(pendencies?.pendingDeliveries ?? [])}
            />
            <PendencyCard
              title="Aguardando revisão"
              tone="info"
              rows={toDeliveryRows(pendencies?.awaitingReviewDeliveries ?? [])}
            />
          </PendenciesGrid>
        )}
      </UserDetailContainer>
    </Layout>
  );
}
