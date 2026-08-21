import {
  TimelineContainer,
  TimelineItem,
  TimelineLine,
  TimelineDot,
  TimelineLabel,
  TimelineStatus,
} from './Timeline.styles';
import type { StepStatus } from './Timeline.styles';

export type { StepStatus };

export interface TimelineStep {
  label: string;
  status: StepStatus;
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const statusIcon: Record<StepStatus, string> = {
  done: '✓',
  active: '● atual',
  pending: '',
};

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <TimelineContainer className={className}>
      {steps.map((step, index) => (
        <TimelineItem key={index}>
          <TimelineLine
            $status={step.status}
            $first={index === 0}
            $last={index === steps.length - 1}
          />
          <TimelineDot $status={step.status} />
          <TimelineLabel $status={step.status}>{step.label}</TimelineLabel>
          <TimelineStatus $status={step.status}>{statusIcon[step.status]}</TimelineStatus>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
}
