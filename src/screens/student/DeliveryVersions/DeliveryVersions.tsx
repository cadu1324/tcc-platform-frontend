import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/layout';
import { DeliveryVersionHistory } from '../../../components/delivery';
import { PageContainer, BackRow } from './DeliveryVersions.styles';

export function DeliveryVersions() {
  const { deliveryId } = useParams<{ deliveryId: string }>();
  const navigate = useNavigate();

  if (!deliveryId) return null;

  return (
    <Layout>
      <PageContainer>
        <BackRow onClick={() => navigate('/student/deliveries')}>← Voltar para Entregas</BackRow>
        <DeliveryVersionHistory deliveryId={deliveryId} />
      </PageContainer>
    </Layout>
  );
}
