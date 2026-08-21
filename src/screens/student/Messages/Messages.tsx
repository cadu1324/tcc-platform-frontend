import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Layout } from '../../../components/layout';
import { Avatar, Button, Input } from '../../../ui';
import {
  MessagesContainer,
  MessagesHeader,
  MessagesTitle,
  MessagesLayout,
  ChatArea,
  ChatMessages,
  MessageBubble,
  MessageText,
  MessageTime,
  ChatInputRow,
  ContactCard,
  ContactName,
  ContactRole,
  ContactMeta,
  EmptyChat,
} from './Messages.styles';

interface Message {
  id: number;
  text: string;
  sentAt: string;
  fromMe: boolean;
}

export function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  function handleSend(): void {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        sentAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        fromMe: true,
      },
    ]);
    setInput('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const advisorName = 'Orientador';

  return (
    <Layout>
      <MessagesContainer>
        <MessagesHeader>
          <MessagesTitle>Mensagens</MessagesTitle>
        </MessagesHeader>

        <MessagesLayout>
          <ChatArea>
            <ChatMessages>
              {messages.length === 0 ? (
                <EmptyChat>Nenhuma mensagem ainda. Inicie a conversa!</EmptyChat>
              ) : (
                messages.map((msg) => (
                  <MessageBubble key={msg.id} $fromMe={msg.fromMe}>
                    <MessageText>{msg.text}</MessageText>
                    <MessageTime>{msg.sentAt}</MessageTime>
                  </MessageBubble>
                ))
              )}
            </ChatMessages>

            <ChatInputRow>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva uma mensagem..."
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                Enviar
              </Button>
            </ChatInputRow>
          </ChatArea>

          <ContactCard>
            <Avatar name={advisorName} size="lg" scheme="blue" />
            <ContactName>{advisorName}</ContactName>
            <ContactRole>Orientador do TCC</ContactRole>
            <ContactMeta>
              Olá, {user?.name?.split(' ')[0]}! Envie uma mensagem para seu orientador.
            </ContactMeta>
          </ContactCard>
        </MessagesLayout>
      </MessagesContainer>
    </Layout>
  );
}
