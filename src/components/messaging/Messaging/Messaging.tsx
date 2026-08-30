import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useMessageContacts } from '../../../hooks/useMessageContacts';
import { useConversation } from '../../../hooks/useConversation';
import { useSendMessage } from '../../../hooks/useSendMessage';
import { Avatar, Button, Input, Spinner } from '../../../ui';
import { UserType } from '../../../types';
import {
  MessagingLayout,
  ContactsPanel,
  ContactButton,
  ContactInfo,
  ContactName,
  ContactPreview,
  UnreadDot,
  ChatPanel,
  ChatHeader,
  ChatMessages,
  Bubble,
  BubbleText,
  BubbleTime,
  ChatInputRow,
  InputWrap,
  EmptyState,
} from './Messaging.styles';

interface MessagingProps {
  emptyLabel: string;
}

const roleLabels: Record<UserType, string> = {
  student: 'Aluno',
  advisor: 'Orientador',
  admin: 'Administrador',
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function Messaging({ emptyLabel }: MessagingProps) {
  const { user } = useAuth();
  const { data: contacts = [], isLoading: contactsLoading } = useMessageContacts();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeId = selectedId ?? contacts[0]?.user_id ?? null;
  const activeContact = useMemo(
    () => contacts.find((contact) => contact.user_id === activeId) ?? null,
    [contacts, activeId],
  );

  const { data: messages = [], isLoading: conversationLoading } = useConversation(activeId);
  const { mutate: send, isPending } = useSendMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  function handleSend(): void {
    const content = draft.trim();
    if (!content || activeId === null) return;
    send({ recipientId: activeId, content }, { onSuccess: () => setDraft('') });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  if (contactsLoading) return <Spinner size="lg" />;

  if (contacts.length === 0) {
    return <EmptyState>{emptyLabel}</EmptyState>;
  }

  return (
    <MessagingLayout>
      <ContactsPanel>
        {contacts.map((contact) => (
          <ContactButton
            key={contact.user_id}
            $active={contact.user_id === activeId}
            onClick={() => setSelectedId(contact.user_id)}
          >
            <Avatar name={contact.name} size="sm" scheme="blue" />
            <ContactInfo>
              <ContactName>{contact.name}</ContactName>
              <ContactPreview>
                {contact.last_message ?? roleLabels[contact.user_type]}
              </ContactPreview>
            </ContactInfo>
            {contact.unread_count > 0 && <UnreadDot>{contact.unread_count}</UnreadDot>}
          </ContactButton>
        ))}
      </ContactsPanel>

      <ChatPanel>
        <ChatHeader>{activeContact?.name ?? 'Conversa'}</ChatHeader>

        <ChatMessages>
          {conversationLoading ? (
            <Spinner size="md" />
          ) : messages.length === 0 ? (
            <EmptyState>Nenhuma mensagem ainda. Comece a conversa.</EmptyState>
          ) : (
            messages.map((message) => {
              const fromMe = message.sender_id === user?.id;
              return (
                <Bubble key={message.id} $fromMe={fromMe}>
                  <BubbleText $fromMe={fromMe}>{message.content}</BubbleText>
                  <BubbleTime $fromMe={fromMe}>{formatTime(message.created_at)}</BubbleTime>
                </Bubble>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInputRow>
          <InputWrap>
            <Input
              fullWidth
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escreva uma mensagem..."
            />
          </InputWrap>
          <Button onClick={handleSend} disabled={isPending || !draft.trim()}>
            Enviar
          </Button>
        </ChatInputRow>
      </ChatPanel>
    </MessagingLayout>
  );
}
