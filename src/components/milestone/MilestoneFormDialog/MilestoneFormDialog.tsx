import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Modal, Input } from '../../../ui';
import type { ButtonProps } from '../../../ui';
import { useCreateMilestone } from '../../../hooks/useCreateMilestone';
import { useUpdateMilestone } from '../../../hooks/useUpdateMilestone';
import type { Milestone } from '../../../types';
import { FormFields, ErrorBanner } from './MilestoneFormDialog.styles';

const schema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  due_date: z.string().optional(),
});

type MilestoneFormValues = z.infer<typeof schema>;

const emptyValues: MilestoneFormValues = { title: '', description: '', due_date: '' };

interface MilestoneFormDialogProps {
  mode: 'create' | 'edit';
  projectId: number;
  milestone?: Milestone;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  triggerVariant?: ButtonProps['variant'];
  triggerSize?: ButtonProps['size'];
}

export function MilestoneFormDialog({
  mode,
  projectId,
  milestone,
  isOpen,
  onOpenChange,
  triggerLabel,
  triggerVariant = 'primary',
  triggerSize = 'md',
}: MilestoneFormDialogProps) {
  const createMilestone = useCreateMilestone();
  const updateMilestone = useUpdateMilestone();
  const [apiError, setApiError] = useState('');
  const pending = createMilestone.isPending || updateMilestone.isPending;

  // The parent remounts this dialog (via `key`) on every open.
  const defaultValues: MilestoneFormValues =
    mode === 'edit' && milestone
      ? {
          title: milestone.title,
          description: milestone.description ?? '',
          due_date: milestone.due_date ? milestone.due_date.slice(0, 10) : '',
        }
      : emptyValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MilestoneFormValues>({ resolver: zodResolver(schema), defaultValues });

  function close() {
    setApiError('');
    onOpenChange(false);
  }

  async function onSubmit(values: MilestoneFormValues) {
    setApiError('');
    const description = values.description?.trim() || undefined;
    const due_date = values.due_date || undefined;
    try {
      if (mode === 'create') {
        await createMilestone.mutateAsync({ projectId, title: values.title, description, due_date });
      } else if (milestone) {
        await updateMilestone.mutateAsync({
          id: milestone.id,
          projectId,
          data: { title: values.title, description, due_date },
        });
      }
      close();
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Não foi possível salvar o marco.');
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        size={triggerSize}
        onClick={(event) => {
          event.stopPropagation();
          onOpenChange(true);
        }}
      >
        {triggerLabel}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={mode === 'create' ? 'Novo marco' : 'Editar marco'}
        footer={
          <>
            <Button variant="ghost" onClick={close} disabled={pending}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={pending}>
              {pending ? 'Salvando...' : 'Salvar'}
            </Button>
          </>
        }
      >
        <FormFields>
          {apiError && <ErrorBanner>{apiError}</ErrorBanner>}
          <Input label="Título" fullWidth {...register('title')} error={errors.title?.message} />
          <Input
            label="Descrição (opcional)"
            fullWidth
            {...register('description')}
            error={errors.description?.message}
          />
          <Input
            label="Prazo (opcional)"
            type="date"
            fullWidth
            {...register('due_date')}
            error={errors.due_date?.message}
          />
        </FormFields>
      </Modal>
    </>
  );
}
