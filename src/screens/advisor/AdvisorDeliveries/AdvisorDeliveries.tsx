import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdvisorDashboard } from '../../../hooks/useAdvisorDashboard';
import { Layout } from '../../../components/layout';
import { Chips, Badge, Button, Spinner } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import type { ChipOption } from '../../../ui';
import type { Delivery } from '../../../types';
import {
  AdvisorDeliveriesContainer,
  PageHeader,
  PageTitle,
  DeliveriesList,
  DeliveryRow,
  DeliveryInfo,
  DeliveryTitle,
  DeliveryMeta,
  EmptyText,
} from './AdvisorDeliveries.styles';

const filterOptions: ChipOption[] = [
  { value: 'submitted', label: 'Aguardando' },
  { value: 'approved', label: 'Aprovadas' },
  { value: 'rejected', label: 'Devolvidas' },
];

const statusLabels: Record<string, string> = {
  submitted: 'Aguardando',
  approved: 'Aprovada',
  rejected: 'Devolvida',
};

const statusVariants: Record<string, 'warning' | 'success' | 'error'> = {
  submitted: 'warning',
  approved: 'success',
  rejected: 'error',
};

function DeliveryItem({ delivery, onReview }: { delivery: Delivery; onReview: () => void }) {
  const variant = statusVariants[delivery.status] ?? 'info';
  const label = statusLabels[delivery.status] ?? delivery.status;
  return (
    <DeliveryRow>
      <DeliveryInfo>
        <DeliveryTitle>{delivery.title}</DeliveryTitle>
        <DeliveryMeta>
          Enviada: {formatDate(delivery.submitted_at)} · Prazo: {formatDate(delivery.deadline)}
        </DeliveryMeta>
      </DeliveryInfo>
      <Badge variant={variant} size="sm">{label}</Badge>
      {delivery.status === 'submitted' && (
        <Button size="sm" onClick={onReview}>Revisar</Button>
      )}
    </DeliveryRow>
  );
}

export function AdvisorDeliveries() {
  const [filter, setFilter] = useState('submitted');
  const { data, isLoading } = useAdvisorDashboard();
  const navigate = useNavigate();

  const allDeliveries: Delivery[] = data?.deliveries_awaiting_feedback ?? [];
  const filtered = filter === 'submitted'
    ? allDeliveries.filter((d) => d.status === 'submitted')
    : allDeliveries.filter((d) => d.status === filter);

  const optionsWithCount: ChipOption[] = filterOptions.map((opt) => ({
    ...opt,
    count: allDeliveries.filter((d) => d.status === opt.value).length || undefined,
  }));

  return (
    <Layout>
      <AdvisorDeliveriesContainer>
        <PageHeader>
          <PageTitle>Entregas para Revisar</PageTitle>
        </PageHeader>

        <Chips options={optionsWithCount} value={filter} onChange={setFilter} />

        {isLoading ? (
          <Spinner size="lg" />
        ) : filtered.length === 0 ? (
          <EmptyText>Nenhuma entrega encontrada</EmptyText>
        ) : (
          <DeliveriesList>
            {filtered.map((d) => (
              <DeliveryItem
                key={d.id}
                delivery={d}
                onReview={() => navigate(`/advisor/review/${d.id}`)}
              />
            ))}
          </DeliveriesList>
        )}
      </AdvisorDeliveriesContainer>
    </Layout>
  );
}
