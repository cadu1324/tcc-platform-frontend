import type { Delivery } from '../../../types';
import { Card, CardContent, Badge } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import {
  DeliveryCardContainer,
  DeliveryCardHeader,
  DeliveryCardTitle,
  DeliveryCardDescription,
  DeliveryCardFooter,
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
}

export function DeliveryCard({ delivery, onClick }: DeliveryCardProps) {
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
            <span>Prazo: {formatDate(delivery.deadline)}</span>
            {delivery.submitted_at && (
              <span>Enviada em: {formatDate(delivery.submitted_at)}</span>
            )}
          </DeliveryCardFooter>
        </DeliveryCardContainer>
      </CardContent>
    </Card>
  );
}
