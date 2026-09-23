import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useNotifications } from '../../../hooks/useNotifications';
import { useMarkNotificationRead } from '../../../hooks/useMarkNotificationRead';
import { formatRelativeDate } from '../../../utils/formatDate';
import { NotificationType } from '../../../types';
import type { Notification, UserType } from '../../../types';
import {
  BellWrap,
  BellButton,
  UnreadCount,
  Panel,
  PanelHeader,
  PanelTitle,
  MarkAllButton,
  Item,
  ItemText,
  ItemTime,
  EmptyRow,
} from './NotificationBell.styles';

const PANEL_LIMIT = 12;

const studentRouteByType: Record<NotificationType, string> = {
  [NotificationType.DELIVERY_CREATED]: '/student/deliveries',
  [NotificationType.FEEDBACK_REGISTERED]: '/student/feedbacks',
  [NotificationType.MILESTONE_CREATED]: '/student/project',
  [NotificationType.MILESTONE_UPDATED]: '/student/project',
  [NotificationType.MESSAGE_RECEIVED]: '/student/messages',
  [NotificationType.MILESTONE_DUE_SOON]: '/student/project',
  [NotificationType.MILESTONE_OVERDUE]: '/student/project',
};

const messagesRouteByRole: Record<UserType, string> = {
  student: '/student/messages',
  advisor: '/advisor/messages',
  admin: '/admin/dashboard',
};

function targetFor(notification: Notification, role: UserType): string {
  if (notification.type === NotificationType.MESSAGE_RECEIVED) {
    return messagesRouteByRole[role];
  }
  if (role === 'advisor') {
    return notification.project_id
      ? `/advisor/students/${notification.project_id}`
      : '/advisor/dashboard';
  }
  if (role === 'student') {
    return studentRouteByType[notification.type] ?? '/student/dashboard';
  }
  if (notification.type === NotificationType.MILESTONE_OVERDUE) {
    return '/admin/projects';
  }
  return '/admin/dashboard';
}

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export function NotificationBell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();

  const unreadIds = notifications.filter((item) => !item.is_read).map((item) => item.id);
  const visible = notifications.slice(0, PANEL_LIMIT);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointer(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  if (!user) return null;

  function handleItemClick(notification: Notification) {
    if (!notification.is_read) markRead(notification.id);
    setIsOpen(false);
    navigate(targetFor(notification, user!.user_type));
  }

  return (
    <BellWrap ref={wrapRef}>
      <BellButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notificações"
      >
        <BellIcon />
        {unreadIds.length > 0 && <UnreadCount>{unreadIds.length}</UnreadCount>}
      </BellButton>

      {isOpen && (
        <Panel>
          <PanelHeader>
            <PanelTitle>Notificações</PanelTitle>
            <MarkAllButton
              type="button"
              disabled={unreadIds.length === 0}
              onClick={() => markRead(unreadIds)}
            >
              Marcar todas como lidas
            </MarkAllButton>
          </PanelHeader>

          {visible.length === 0 ? (
            <EmptyRow>Nenhuma notificação.</EmptyRow>
          ) : (
            visible.map((notification) => (
              <Item
                key={notification.id}
                type="button"
                $unread={!notification.is_read}
                onClick={() => handleItemClick(notification)}
              >
                <ItemText $unread={!notification.is_read}>{notification.message}</ItemText>
                <ItemTime>{formatRelativeDate(notification.created_at)}</ItemTime>
              </Item>
            ))
          )}
        </Panel>
      )}
    </BellWrap>
  );
}
