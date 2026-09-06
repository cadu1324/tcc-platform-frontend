import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { useAuth } from './useAuth';
import type { CreateProjectData } from '../types';

type CreateProjectInput = Omit<CreateProjectData, 'student_id'>;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: CreateProjectInput) =>
      projectService.create({
        ...input,
        student_id: user!.id,
        start_date: input.start_date ?? today(),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['my-project', user?.id] });
      void queryClient.invalidateQueries({ queryKey: ['student-dashboard', user?.id] });
    },
  });
}
