import { useState } from 'react';
import { Button, Modal } from '../../../ui';
import { useCreateProject } from '../../../hooks/useCreateProject';
import { ProjectForm } from '../ProjectForm';
import type { ButtonProps } from '../../../ui';
import type { CreateProjectData } from '../../../types';
import { ErrorBanner } from './CreateProjectDialog.styles';

type ProjectFormValues = Omit<CreateProjectData, 'student_id'>;

interface CreateProjectDialogProps {
  triggerLabel?: string;
  triggerVariant?: ButtonProps['variant'];
}

export function CreateProjectDialog({
  triggerLabel = 'Criar projeto',
  triggerVariant = 'primary',
}: CreateProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const { mutateAsync } = useCreateProject();

  function close() {
    setIsOpen(false);
    setError('');
  }

  async function handleSubmit(values: ProjectFormValues) {
    setError('');
    try {
      await mutateAsync(values);
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar o projeto.');
    }
  }

  return (
    <>
      <Button variant={triggerVariant} onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>

      <Modal isOpen={isOpen} onClose={close} title="Criar projeto">
        {error && <ErrorBanner>{error}</ErrorBanner>}
        <ProjectForm onSubmit={handleSubmit} onCancel={close} />
      </Modal>
    </>
  );
}
