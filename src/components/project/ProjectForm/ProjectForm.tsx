import { FormEvent, useState } from 'react';
import { Button, Input } from '../../../ui';
import { CreateProjectData } from '../../../types';
import { FormContainer, FormActions } from './ProjectForm.styles';

interface ProjectFormProps {
  onSubmit: (data: CreateProjectData) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [advisorId, setAdvisorId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        title,
        description,
        expected_delivery_date: expectedDate,
        advisor_id: advisorId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        label="Título do projeto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Input
        label="Data prevista de entrega"
        type="date"
        value={expectedDate}
        onChange={(e) => setExpectedDate(e.target.value)}
        required
      />

      {/* TODO: Substituir por Select com lista de orientadores */}
      <Input
        label="ID do Orientador"
        value={advisorId}
        onChange={(e) => setAdvisorId(e.target.value)}
        required
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
