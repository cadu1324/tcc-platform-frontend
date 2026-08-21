import { useMyFeedbacks } from '../../../hooks/useMyFeedbacks';
import { Layout } from '../../../components/layout';
import { Avatar, Badge, Spinner } from '../../../ui';
import { formatRelativeDate } from '../../../utils/formatDate';
import type { FeedbackWithRelations } from '../../../types';
import {
  FeedbacksContainer,
  FeedbacksHeader,
  FeedbacksTitle,
  FeedbacksList,
  FeedbackItem,
  FeedbackTopRow,
  FeedbackMeta,
  FeedbackAdvisorInfo,
  FeedbackAdvisorName,
  FeedbackDelivery,
  FeedbackActions,
  FeedbackDate,
  FeedbackComment,
  EmptyText,
} from './Feedbacks.styles';

function FeedbackRow({ feedback }: { feedback: FeedbackWithRelations }) {
  const isApproved = feedback.grade >= 7;
  return (
    <FeedbackItem>
      <FeedbackTopRow>
        <FeedbackMeta>
          <Avatar name={feedback.advisor_name} size="sm" scheme="blue" />
          <FeedbackAdvisorInfo>
            <FeedbackAdvisorName>{feedback.advisor_name}</FeedbackAdvisorName>
            <FeedbackDelivery>{feedback.delivery_title}</FeedbackDelivery>
          </FeedbackAdvisorInfo>
        </FeedbackMeta>
        <FeedbackActions>
          <Badge variant={isApproved ? 'success' : 'warning'} size="sm">
            {isApproved ? 'Aprovado' : 'Revisão'}
          </Badge>
          <FeedbackDate>{formatRelativeDate(feedback.created_at)}</FeedbackDate>
        </FeedbackActions>
      </FeedbackTopRow>
      <FeedbackComment>{feedback.comment}</FeedbackComment>
    </FeedbackItem>
  );
}

export function Feedbacks() {
  const { data: feedbacks, isLoading } = useMyFeedbacks();

  return (
    <Layout>
      <FeedbacksContainer>
        <FeedbacksHeader>
          <FeedbacksTitle>Feedbacks</FeedbacksTitle>
        </FeedbacksHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : !feedbacks || feedbacks.length === 0 ? (
          <EmptyText>Nenhum feedback recebido ainda</EmptyText>
        ) : (
          <FeedbacksList>
            {feedbacks.map((f) => (
              <FeedbackRow key={f.id} feedback={f} />
            ))}
          </FeedbacksList>
        )}
      </FeedbacksContainer>
    </Layout>
  );
}
