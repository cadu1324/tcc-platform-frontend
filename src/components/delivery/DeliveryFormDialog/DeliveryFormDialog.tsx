import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Modal, Input, Select } from '../../../ui';
import { useCreateDelivery } from '../../../hooks/useCreateDelivery';
import { MilestoneStatus, type Milestone } from '../../../types';
import { FormFields, ErrorLine } from './DeliveryFormDialog.styles';

const schema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  milestone_id: z.number({ error: 'Selecione o marco correspondente' }).min(1, 'Selecione o marco correspondente'),
});

type FormData = z.infer<typeof schema>;

interface DeliveryFormDialogProps {
  projectId: number;
  milestones: Milestone[];
  defaultMilestoneId?: number;
  triggerLabel?: string;
  triggerSize?: 'sm' | 'md' | 'lg';
}

export function DeliveryFormDialog({
  projectId,
  milestones,
  defaultMilestoneId,
  triggerLabel = 'Nova entrega',
  triggerSize = 'md',
}: DeliveryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error } = useCreateDelivery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { milestone_id: defaultMilestoneId },
  });

  const openMilestones = milestones.filter(
    (milestone) => milestone.status !== MilestoneStatus.COMPLETED,
  );

  const milestoneOptions = openMilestones.map((milestone) => ({
    value: milestone.id.toString(),
    label: milestone.title,
  }));

  function close() {
    setIsOpen(false);
    reset();
  }

  function onSubmit(data: FormData) {
    mutate(
      {
        projectId,
        milestoneId: data.milestone_id,
        title: data.title,
        description: data.description,
      },
      { onSuccess: close },
    );
  }

  return (
    <>
      <Button size={triggerSize} onClick={() => setIsOpen(true)} disabled={openMilestones.length === 0}>
        {triggerLabel}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Nova entrega"
        footer={
          <>
            <Button variant="ghost" onClick={close} disabled={isPending}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
              {isPending ? 'Criando...' : 'Criar entrega'}
            </Button>
          </>
        }
      >
        <FormFields>
          <Select
            label="Marco"
            fullWidth
            placeholder="Selecione o marco correspondente"
            options={milestoneOptions}
            defaultValue={defaultMilestoneId?.toString()}
            {...register('milestone_id', { valueAsNumber: true })}
            error={errors.milestone_id?.message}
          />
          <Input
            label="Título"
            fullWidth
            {...register('title')}
            error={errors.title?.message}
          />
          <Input
            label="Descrição"
            fullWidth
            {...register('description')}
            error={errors.description?.message}
          />
          {error && <ErrorLine>{error.message}</ErrorLine>}
        </FormFields>
      </Modal>
    </>
  );
}
