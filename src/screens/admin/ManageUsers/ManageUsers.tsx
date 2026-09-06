import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllUsers } from '../../../hooks/useAllUsers';
import { Layout } from '../../../components/layout';
import { UserFormDialog, ToggleUserActiveButton } from '../../../components/user';
import { Table, Badge, Spinner } from '../../../ui';
import type { TableColumn } from '../../../ui';
import type { User } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import {
  ManageUsersContainer,
  ManageUsersHeader,
  ManageUsersTitle,
  ActiveBadge,
  RowActions,
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

const baseColumns: TableColumn<User>[] = [
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
      <ActiveBadge $active={user.is_active}>{user.is_active ? 'Ativo' : 'Inativo'}</ActiveBadge>
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
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const columns: TableColumn<User>[] = [
    ...baseColumns,
    {
      key: 'actions',
      header: 'Ações',
      render: (user) => (
        <RowActions onClick={(event) => event.stopPropagation()}>
          <UserFormDialog
            key={`edit-${user.id}-${editingId === user.id}`}
            mode="edit"
            user={user}
            isOpen={editingId === user.id}
            onOpenChange={(open) => setEditingId(open ? user.id : null)}
            triggerLabel="Editar"
            triggerVariant="ghost"
            triggerSize="sm"
          />
          <ToggleUserActiveButton user={user} />
        </RowActions>
      ),
    },
  ];

  return (
    <Layout>
      <ManageUsersContainer>
        <ManageUsersHeader>
          <ManageUsersTitle>Gerenciar Usuários</ManageUsersTitle>
          <UserFormDialog
            key={`create-${isCreating}`}
            mode="create"
            isOpen={isCreating}
            onOpenChange={setIsCreating}
            triggerLabel="Novo usuário"
          />
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
