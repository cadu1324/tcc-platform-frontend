import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Modal, Input, Select } from '../../../ui';
import type { ButtonProps } from '../../../ui';
import { useAuth } from '../../../hooks/useAuth';
import { useCreateUser } from '../../../hooks/useCreateUser';
import { useUpdateUser } from '../../../hooks/useUpdateUser';
import { UserType } from '../../../types';
import type { User, UpdateUserData } from '../../../types';
import { FormFields, ErrorBanner } from './UserFormDialog.styles';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  user_type: z.enum([UserType.STUDENT, UserType.ADVISOR, UserType.ADMIN], {
    message: 'Selecione o perfil',
  }),
  password: z.string().min(6, 'Mínimo 6 caracteres').optional().or(z.literal('')),
});

type UserFormValues = z.infer<typeof schema>;

const roleOptions = [
  { value: UserType.STUDENT, label: 'Aluno' },
  { value: UserType.ADVISOR, label: 'Orientador' },
  { value: UserType.ADMIN, label: 'Administrador' },
];

const emptyValues: UserFormValues = {
  name: '',
  email: '',
  user_type: UserType.STUDENT,
  password: '',
};

interface UserFormDialogProps {
  mode: 'create' | 'edit';
  user?: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  triggerVariant?: ButtonProps['variant'];
  triggerSize?: ButtonProps['size'];
}

export function UserFormDialog({
  mode,
  user,
  isOpen,
  onOpenChange,
  triggerLabel,
  triggerVariant = 'primary',
  triggerSize = 'md',
}: UserFormDialogProps) {
  const { user: currentUser } = useAuth();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const [apiError, setApiError] = useState('');
  const pending = createUser.isPending || updateUser.isPending;

  // The parent remounts this dialog (via `key`) on every open, so seeding
  // `defaultValues` once per mount is enough to keep the form fresh.
  const defaultValues: UserFormValues =
    mode === 'edit' && user
      ? { name: user.name, email: user.email, user_type: user.user_type, password: '' }
      : emptyValues;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: zodResolver(schema), defaultValues });

  const isSelf = mode === 'edit' && !!user && user.id === currentUser?.id;

  function close() {
    setApiError('');
    onOpenChange(false);
  }

  async function onSubmit(values: UserFormValues) {
    setApiError('');
    try {
      if (mode === 'create') {
        if (!values.password) {
          setError('password', { message: 'Senha obrigatória' });
          return;
        }
        await createUser.mutateAsync({
          name: values.name,
          email: values.email,
          user_type: values.user_type,
          password: values.password,
        });
      } else {
        if (!user) return;
        const data: UpdateUserData = {
          name: values.name,
          email: values.email,
          user_type: values.user_type,
        };
        if (values.password) data.password = values.password;
        await updateUser.mutateAsync({ id: user.id, data });
      }
      close();
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Não foi possível salvar o usuário.');
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
        title={mode === 'create' ? 'Novo usuário' : 'Editar usuário'}
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

          <Input label="Nome" fullWidth {...register('name')} error={errors.name?.message} />
          <Input
            label="E-mail"
            type="email"
            fullWidth
            {...register('email')}
            error={errors.email?.message}
          />
          <Select
            label="Perfil"
            fullWidth
            options={roleOptions}
            disabled={isSelf}
            {...register('user_type')}
            error={errors.user_type?.message}
          />
          <Input
            label={mode === 'create' ? 'Senha' : 'Nova senha (deixe em branco para manter)'}
            type="password"
            fullWidth
            {...register('password')}
            error={errors.password?.message}
          />
        </FormFields>
      </Modal>
    </>
  );
}
