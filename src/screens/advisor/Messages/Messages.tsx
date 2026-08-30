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

        <Messaging emptyLabel="Você ainda não tem orientandos para conversar." />
      </MessagesContainer>
    </Layout>
  );
}
