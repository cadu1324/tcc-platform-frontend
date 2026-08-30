import { useNavigate } from 'react-router-dom';
import { useAllUsers } from '../../../hooks/useAllUsers';
import { Layout } from '../../../components/layout';
import { Table, Badge, Spinner } from '../../../ui';
import type { TableColumn } from '../../../ui';
import type { User } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import {
  ManageUsersContainer,
  ManageUsersHeader,
  ManageUsersTitle,
  ActiveBadge,
} from './ManageUsers.styles';

const roleLabels: Record<string, string> = {
  student: 'Aluno',
  advisor: 'Orientador',
  admin: 'Administrador',
};

const roleVariants: Record<string, 'info' | 'warning' | 'error'> = {
  student: 'info',
  advisor: 'warning',
  admin: 'error',
};

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Nome' },
  { key: 'email', header: 'E-mail' },
  {
    key: 'user_type',
    header: 'Tipo',
    render: (user) => (
      <Badge variant={roleVariants[user.user_type] ?? 'info'}>
        {roleLabels[user.user_type] ?? user.user_type}
      </Badge>
    ),
  },
  {
    key: 'is_active',
    header: 'Status',
    render: (user) => (
      <ActiveBadge $active={user.is_active}>
        {user.is_active ? 'Ativo' : 'Inativo'}
      </ActiveBadge>
    ),
  },
  {
    key: 'created_at',
    header: 'Cadastro',
    render: (user) => formatDate(user.created_at),
  },
];

export function ManageUsers() {
  const { data: users, isLoading } = useAllUsers();
  const navigate = useNavigate();

  return (
    <Layout>
      <ManageUsersContainer>
        <ManageUsersHeader>
          <ManageUsersTitle>Gerenciar Usuários</ManageUsersTitle>
        </ManageUsersHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <Table<User>
            columns={columns}
            data={users ?? []}
            keyExtractor={(u) => u.id.toString()}
            emptyMessage="Nenhum usuário cadastrado."
            onRowClick={(user) => navigate(`/admin/users/${user.id}`)}
          />
        )}
      </ManageUsersContainer>
    </Layout>
  );
}
