import { Layout } from '../../../components/layout';
import {
  ManageUsersContainer,
  ManageUsersHeader,
  ManageUsersTitle,
} from './ManageUsers.styles';

export function ManageUsers() {
  // TODO: Buscar lista de usuários via API
  return (
    <Layout>
      <ManageUsersContainer>
        <ManageUsersHeader>
          <ManageUsersTitle>Gerenciar Usuários</ManageUsersTitle>
        </ManageUsersHeader>

        {/* TODO: Adicionar tabela de usuários com ações */}
        <p>Gerenciamento de usuários - em desenvolvimento.</p>
      </ManageUsersContainer>
    </Layout>
  );
}
