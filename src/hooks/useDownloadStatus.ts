import { useEffect } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';
import type { SaveOutcome } from '../utils/saveFile';

const SAVED_FEEDBACK_MS = 4000;

export type DownloadStatus = 'idle' | 'pending' | 'saved' | 'error';

type DownloadMutation = Pick<
  UseMutationResult<SaveOutcome, Error, never>,
  'data' | 'isPending' | 'isError' | 'reset'
>;

export function useDownloadStatus({ data, isPending, isError, reset }: DownloadMutation): DownloadStatus {
  const isSaved = !isPending && data === 'saved';

  useEffect(() => {
    if (!isSaved) return;
    const timer = window.setTimeout(reset, SAVED_FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [isSaved, reset]);

  if (isPending) return 'pending';
  if (isError) return 'error';
  return isSaved ? 'saved' : 'idle';
}
