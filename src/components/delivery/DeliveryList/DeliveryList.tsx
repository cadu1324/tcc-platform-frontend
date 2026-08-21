import type { Delivery } from '../../../types';
import { Spinner } from '../../../ui';
import { DeliveryCard } from '../DeliveryCard';
import {
  DeliveryListContainer,
  DeliveryListHeader,
  DeliveryListTitle,
  EmptyMessage,
} from './DeliveryList.styles';

interface DeliveryListProps {
  deliveries: Delivery[];
  title?: string;
  isLoading?: boolean;
  onDeliveryClick?: (delivery: Delivery) => void;
}

export function DeliveryList({
  deliveries,
  title = 'Entregas',
  isLoading = false,
  onDeliveryClick,
}: DeliveryListProps) {
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <DeliveryListContainer>
      <DeliveryListHeader>
        <DeliveryListTitle>{title}</DeliveryListTitle>
      </DeliveryListHeader>

      {deliveries.length === 0 ? (
        <EmptyMessage>Nenhuma entrega encontrada.</EmptyMessage>
      ) : (
        deliveries.map((delivery) => (
          <DeliveryCard
            key={delivery.id}
            delivery={delivery}
            onClick={() => onDeliveryClick?.(delivery)}
          />
        ))
      )}
    </DeliveryListContainer>
  );
}
