import type { ReactNode } from 'react';
import type { Delivery } from '../../../types';
import { Card, CardContent, Badge } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import { DownloadFileButton } from '../DownloadFileButton';
import {
  DeliveryCardContainer,
  DeliveryCardHeader,
  DeliveryCardTitle,
  DeliveryCardDescription,
  DeliveryCardFooter,
  DeliveryCardActions,
} from './DeliveryCard.styles';

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  submitted: 'Enviada',
  approved: 'Aprovada',
  rejected: 'Rejeitada',
};

const statusVariants: Record<string, 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  submitted: 'info',
  approved: 'success',
  rejected: 'error',
};

interface DeliveryCardProps {
  delivery: Delivery;
  onClick?: () => void;
  action?: ReactNode;
}

export function DeliveryCard({ delivery, onClick, action }: DeliveryCardProps) {
  return (
    <Card onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <DeliveryCardContainer>
          <DeliveryCardHeader>
            <DeliveryCardTitle>{delivery.title}</DeliveryCardTitle>
            <Badge variant={statusVariants[delivery.status]}>
              {statusLabels[delivery.status]}
            </Badge>
          </DeliveryCardHeader>

          <DeliveryCardDescription>
            {delivery.description}
          </DeliveryCardDescription>

          <DeliveryCardFooter>
            {delivery.milestone_title && <span>Marco: {delivery.milestone_title}</span>}
            <span>Prazo: {formatDate(delivery.deadline)}</span>
            {delivery.submitted_at && (
              <span>Enviada em: {formatDate(delivery.submitted_at)}</span>
            )}
          </DeliveryCardFooter>

          {(delivery.file_url || action) && (
            <DeliveryCardActions>
              {delivery.file_url && (
                <DownloadFileButton deliveryId={delivery.id} fileName={delivery.file_name} />
              )}
              {action}
            </DeliveryCardActions>
          )}
        </DeliveryCardContainer>
      </CardContent>
    </Card>
  );
}
