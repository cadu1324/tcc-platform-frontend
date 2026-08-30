import { Layout } from '../../../components/layout';
import { Messaging } from '../../../components/messaging';
import { MessagesContainer, MessagesHeader, MessagesTitle } from './Messages.styles';

export function Messages() {
  return (
    <Layout>
      <MessagesContainer>
        <MessagesHeader>
          <MessagesTitle>Mensagens</MessagesTitle>
        </MessagesHeader>

        <Messaging emptyLabel="Seu projeto ainda não tem um orientador definido." />
      </MessagesContainer>
    </Layout>
  );
}
