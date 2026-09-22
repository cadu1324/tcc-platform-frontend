import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDeliveryById } from '../../../hooks/useDeliveryById';
import { useSubmitReview } from '../../../hooks/useSubmitReview';
import { Layout } from '../../../components/layout';
import { DownloadFileButton, ViewVersionHistoryButton } from '../../../components/delivery';
import { Card, CardContent, Badge, Button, Input, Spinner } from '../../../ui';
import { formatDate, formatDateTime } from '../../../utils/formatDate';
import { DeliveryStatus } from '../../../types';
import {
  ReviewContainer,
  BackRow,
  PageHeader,
  PageTitle,
  ContentGrid,
  SectionTitle,
  DeliveryDescription,
  MetaRow,
  MetaItem,
  FormFields,
  FormActions,
  SuccessBanner,
} from './ReviewDelivery.styles';

const reviewSchema = z.object({
  grade: z.number({ error: 'Informe uma nota válida' }).min(0, 'Mínimo 0').max(10, 'Máximo 10'),
  comment: z.string().min(10, 'Comentário deve ter pelo menos 10 caracteres'),
});
type ReviewFormData = z.infer<typeof reviewSchema>;

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  submitted: 'Aguardando revisão',
  approved: 'Aprovada',
  rejected: 'Devolvida',
};

const statusVariants: Record<string, 'warning' | 'info' | 'success' | 'error'> = {
  pending: 'info',
  submitted: 'warning',
  approved: 'success',
  rejected: 'error',
};

export function ReviewDelivery() {
  const { deliveryId } = useParams<{ deliveryId: string }>();
  const navigate = useNavigate();
  const { data: delivery, isLoading } = useDeliveryById(deliveryId);
  const { mutate, isPending, isSuccess } = useSubmitReview();

  const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  function submitWithStatus(status: typeof DeliveryStatus.APPROVED | typeof DeliveryStatus.REJECTED) {
    return handleSubmit((data) => {
      if (!delivery) return;
      mutate({ deliveryId: delivery.id, status, comment: data.comment, grade: data.grade });
    });
  }

  if (isLoading) {
    return <Layout><ReviewContainer><Spinner size="lg" /></ReviewContainer></Layout>;
  }

  if (!delivery) {
    return (
      <Layout>
        <ReviewContainer>
          <BackRow onClick={() => navigate('/advisor/deliveries')}>← Voltar</BackRow>
          <p>Entrega não encontrada.</p>
        </ReviewContainer>
      </Layout>
    );
  }

  const alreadyReviewed = delivery.status !== 'submitted';

  return (
    <Layout>
      <ReviewContainer>
        <BackRow onClick={() => navigate('/advisor/deliveries')}>← Voltar para Entregas</BackRow>

        <PageHeader>
          <PageTitle>{delivery.title}</PageTitle>
          <Badge variant={statusVariants[delivery.status] ?? 'info'}>
            {statusLabels[delivery.status] ?? delivery.status}
          </Badge>
        </PageHeader>

        <ContentGrid>
          <Card>
            <CardContent>
              <SectionTitle>Detalhes da entrega</SectionTitle>
              <DeliveryDescription>{delivery.description}</DeliveryDescription>

              <MetaRow>
                <MetaItem>Prazo: {formatDate(delivery.deadline)}</MetaItem>
                {delivery.submitted_at && (
                  <MetaItem>Enviada em: {formatDateTime(delivery.submitted_at)}</MetaItem>
                )}
              </MetaRow>

              {delivery.file_url ? (
                <FormActions>
                  <DownloadFileButton
                    deliveryId={delivery.id}
                    fileName={delivery.file_name}
                    variant="outline"
                    size="sm"
                  />
                  <ViewVersionHistoryButton to={`/advisor/deliveries/${delivery.id}/versions`} />
                </FormActions>
              ) : (
                <MetaItem>Nenhum arquivo anexado</MetaItem>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionTitle>Avaliação</SectionTitle>

              {isSuccess ? (
                <SuccessBanner>Avaliação enviada com sucesso!</SuccessBanner>
              ) : alreadyReviewed ? (
                <SuccessBanner>Esta entrega já foi avaliada.</SuccessBanner>
              ) : (
                <FormFields>
                  <Input
                    label="Nota (0–10)"
                    type="number"
                    {...register('grade', { valueAsNumber: true })}
                    error={errors.grade?.message}
                  />
                  <Input
                    label="Comentário"
                    {...register('comment')}
                    error={errors.comment?.message}
                  />
                  <FormActions>
                    <Button
                      onClick={submitWithStatus(DeliveryStatus.APPROVED)}
                      disabled={isPending}
                    >
                      {isPending ? 'Enviando...' : 'Aprovar'}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={submitWithStatus(DeliveryStatus.REJECTED)}
                      disabled={isPending}
                    >
                      Devolver
                    </Button>
                  </FormActions>
                </FormFields>
              )}
            </CardContent>
          </Card>
        </ContentGrid>
      </ReviewContainer>
    </Layout>
  );
}
