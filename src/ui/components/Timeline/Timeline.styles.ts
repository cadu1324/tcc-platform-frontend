import styled from 'styled-components';

export type StepStatus = 'done' | 'active' | 'pending';

export const TimelineContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const TimelineItem = styled.div`
  flex: 1;
  text-align: center;
`;

export const TimelineLine = styled.div<{
  $status: StepStatus;
  $first: boolean;
  $last: boolean;
}>`
  height: 3px;
  background-color: ${({ theme, $status }) =>
    ({
      done: theme.colors.primary.main,
      active: theme.colors.warning.main,
      pending: theme.colors.border.dark,
    })[$status]};
  border-radius: ${({ $first, $last }) =>
    $first ? '2px 0 0 2px' : $last ? '0 2px 2px 0' : '0'};
`;

export const TimelineDot = styled.div<{ $status: StepStatus }>`
  width: ${({ $status }) => ($status === 'active' ? '12px' : '10px')};
  height: ${({ $status }) => ($status === 'active' ? '12px' : '10px')};
  border-radius: 50%;
  background-color: ${({ theme, $status }) =>
    $status === 'pending'
      ? theme.colors.border.dark
      : $status === 'done'
        ? theme.colors.primary.main
        : theme.colors.warning.main};
  border: ${({ theme, $status }) =>
    $status === 'active' ? `2px solid ${theme.colors.background.default}` : 'none'};
  margin: ${({ $status }) =>
    $status === 'active' ? '-7px auto 5px' : '-6px auto 6px'};
`;

export const TimelineLabel = styled.div<{ $status: StepStatus }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme, $status }) =>
    $status === 'active' ? theme.colors.text.primary : theme.colors.text.disabled};
  font-weight: ${({ theme, $status }) =>
    $status === 'active'
      ? theme.typography.fontWeight.semibold
      : theme.typography.fontWeight.regular};
`;

export const TimelineStatus = styled.div<{ $status: StepStatus }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  height: 16px;
  color: ${({ theme, $status }) =>
    $status === 'done'
      ? theme.colors.success.main
      : $status === 'active'
        ? theme.colors.warning.main
        : 'transparent'};
`;
