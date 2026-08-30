import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Modal, Input } from '../../../ui';
import { useCreateDelivery } from '../../../hooks/useCreateDelivery';
import { FormFields, ErrorLine } from './DeliveryFormDialog.styles';

const schema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  deadline: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface DeliveryFormDialogProps {
  projectId: number;
}

export function DeliveryFormDialog({ projectId }: DeliveryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error } = useCreateDelivery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function close() {
    setIsOpen(false);
    reset();
  }

  function onSubmit(data: FormData) {
    mutate(
      {
        projectId,
        title: data.title,
        description: data.description,
        deadline: data.deadline || undefined,
      },
      { onSuccess: close },
    );
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Nova entrega</Button>

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
          <Input
            label="Prazo (opcional)"
            type="date"
            fullWidth
            {...register('deadline')}
            error={errors.deadline?.message}
          />
          {error && <ErrorLine>{error.message}</ErrorLine>}
        </FormFields>
      </Modal>
    </>
  );
}
