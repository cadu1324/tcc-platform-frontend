import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button, Input, Select } from '../../../ui';
import { useRegister } from '../../../hooks/useRegister';
import { UserType } from '../../../types';
import {
  FormContainer,
  FormLogo,
  FormSubtitle,
  FormGrid,
  InfoBox,
  FormFooter,
  ErrorBanner,
} from './RegisterForm.styles';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome obrigatório'),
    registration: z.string().min(1, 'Matrícula obrigatória'),
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, '1 letra maiúscula obrigatória')
      .regex(/[0-9]/, '1 número obrigatório'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
    user_type: z.enum([UserType.STUDENT, UserType.ADVISOR], {
      message: 'Selecione o perfil',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const userTypeOptions = [
  { value: UserType.STUDENT, label: 'Aluno' },
  { value: UserType.ADVISOR, label: 'Orientador' },
];

export function RegisterForm() {
  const { mutate, isPending, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  function onSubmit(data: RegisterFormData): void {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      user_type: data.user_type,
    });
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormLogo>TCC Platform</FormLogo>
      <FormSubtitle>Criar conta</FormSubtitle>

      {error && <ErrorBanner>{error.message}</ErrorBanner>}

      <FormGrid>
        <Input
          label="Nome completo"
          fullWidth
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Matrícula"
          fullWidth
          error={errors.registration?.message}
          {...register('registration')}
        />
      </FormGrid>

      <Input
        label="E-mail institucional"
        type="email"
        fullWidth
        error={errors.email?.message}
        {...register('email')}
      />

      <FormGrid>
        <Input
          label="Senha"
          type="password"
          fullWidth
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirmar"
          type="password"
          fullWidth
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </FormGrid>

      <Select
        label="Perfil"
        options={userTypeOptions}
        placeholder="Selecione o perfil"
        fullWidth
        error={errors.user_type?.message}
        {...register('user_type')}
      />

      <InfoBox>Senha: mín. 8 caracteres, 1 maiúscula e 1 número.</InfoBox>

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Criando conta...' : 'Criar conta'}
      </Button>

      <FormFooter>
        Já tem conta? <Link to="/login">Fazer login</Link>
      </FormFooter>
    </FormContainer>
  );
}
