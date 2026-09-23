import { useDeliveryById } from '../../../hooks/useDeliveryById';
import { useDeliveryVersions } from '../../../hooks/useDeliveryVersions';
import { Card, CardContent, Spinner } from '../../../ui';
import { DeliveryVersionRow } from './DeliveryVersionRow';
import { HistoryContainer, HistoryHeader, HistoryTitle, HistorySubtitle } from './DeliveryVersionHistory.styles';

interface DeliveryVersionHistoryProps {
  deliveryId: string;
}

export function DeliveryVersionHistory({ deliveryId }: DeliveryVersionHistoryProps) {
  const { data: delivery, isLoading: isLoadingDelivery } = useDeliveryById(deliveryId);
  const { data: versions = [], isLoading: isLoadingVersions } = useDeliveryVersions(Number(deliveryId));

  const isLoading = isLoadingDelivery || isLoadingVersions;

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Histórico de Versões{delivery ? ` — ${delivery.title}` : ''}</HistoryTitle>
        <HistorySubtitle>Todas as versões enviadas para esta entrega, da mais recente à mais antiga</HistorySubtitle>
      </HistoryHeader>

      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Card>
          <CardContent>
            {versions.length === 0 ? (
              <p>Nenhuma versão enviada ainda.</p>
            ) : (
              versions.map((version, index) => (
                <DeliveryVersionRow
                  key={version.id}
                  deliveryId={Number(deliveryId)}
                  version={version}
                  isCurrent={index === 0}
                />
              ))
            )}
          </CardContent>
        </Card>
      )}
    </HistoryContainer>
  );
}
