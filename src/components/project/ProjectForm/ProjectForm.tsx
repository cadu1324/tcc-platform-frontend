import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, Spinner } from '../../../ui';
import { useAdvisors } from '../../../hooks/useAdvisors';
import type { CreateProjectData } from '../../../types';
import { FormContainer, FormActions } from './ProjectForm.styles';

const schema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  knowledge_area: z.string().min(3, 'Informe a área de conhecimento'),
  expected_delivery_date: z.string().min(1, 'Informe a data prevista'),
  advisor_id: z.number({ error: 'Selecione um orientador' }).min(1, 'Selecione um orientador'),
});

type FormData = z.infer<typeof schema>;

interface ProjectFormProps {
  onSubmit: (data: Omit<CreateProjectData, 'student_id'>) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const { data: advisors, isLoading: loadingAdvisors } = useAdvisors();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const advisorOptions = (advisors ?? []).map((a) => ({
    value: a.id.toString(),
    label: a.name,
  }));

  async function handleFormSubmit(data: FormData) {
    await onSubmit(data);
  }

  if (loadingAdvisors) return <Spinner size="md" />;

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        label="Título do projeto"
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
        label="Área de conhecimento"
        fullWidth
        placeholder="Ex.: Engenharia de Software"
        {...register('knowledge_area')}
        error={errors.knowledge_area?.message}
      />

      <Input
        label="Data prevista de entrega"
        type="date"
        fullWidth
        {...register('expected_delivery_date')}
        error={errors.expected_delivery_date?.message}
      />

      <Select
        label="Orientador"
        fullWidth
        placeholder="Selecione um orientador"
        options={advisorOptions}
        {...register('advisor_id', { valueAsNumber: true })}
        error={errors.advisor_id?.message}
      />

      <FormActions>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Projeto'}
        </Button>
      </FormActions>
    </FormContainer>
  );
}
