import { useState } from 'react';
import { useMyProject } from '../../../hooks/useMyProject';
import { useProjectDeliveries } from '../../../hooks/useProjectDeliveries';
import { Layout } from '../../../components/layout';
import { Chips, Spinner } from '../../../ui';
import { DeliveryCard } from '../../../components/delivery';
import type { ChipOption } from '../../../ui';
import type { Delivery } from '../../../types';
import {
  DeliveriesContainer,
  DeliveriesHeader,
  DeliveriesTitle,
  DeliveriesGrid,
  EmptyText,
} from './Deliveries.styles';

const filterOptions: ChipOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'submitted', label: 'Enviadas' },
  { value: 'approved', label: 'Aprovadas' },
  { value: 'rejected', label: 'Devolvidas' },
];

export function Deliveries() {
  const [filter, setFilter] = useState('all');
  const { data: project } = useMyProject();
  const { data: deliveries, isLoading } = useProjectDeliveries(project?.id);

  const all: Delivery[] = deliveries ?? [];
  const filtered = filter === 'all' ? all : all.filter((d) => d.status === filter);

  const optionsWithCount: ChipOption[] = filterOptions.map((opt) => ({
    ...opt,
    count:
      opt.value === 'all'
        ? all.length
        : (all.filter((d) => d.status === opt.value).length || undefined),
  }));

  return (
    <Layout>
      <DeliveriesContainer>
        <DeliveriesHeader>
          <DeliveriesTitle>Entregas</DeliveriesTitle>
        </DeliveriesHeader>

        <Chips options={optionsWithCount} value={filter} onChange={setFilter} />

        {isLoading ? (
          <Spinner size="lg" />
        ) : filtered.length === 0 ? (
          <EmptyText>Nenhuma entrega encontrada</EmptyText>
        ) : (
          <DeliveriesGrid>
            {filtered.map((delivery) => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </DeliveriesGrid>
        )}
      </DeliveriesContainer>
    </Layout>
  );
}
