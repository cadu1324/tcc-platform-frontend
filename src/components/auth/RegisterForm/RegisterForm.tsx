import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../ui';
import { useRegister } from '../../../hooks/useRegister';
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
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

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
    });
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormLogo>TCC Platform</FormLogo>
      <FormSubtitle>Criar conta de aluno</FormSubtitle>

      {error && <ErrorBanner>{error.message}</ErrorBanner>}

      <Input
        label="Nome completo"
        fullWidth
        error={errors.name?.message}
        {...register('name')}
      />

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

      <InfoBox>
        Senha: mín. 6 caracteres. Contas de orientador ou administrador são criadas por um administrador.
      </InfoBox>

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Criando conta...' : 'Criar conta'}
      </Button>

      <FormFooter>
        Já tem conta? <Link to="/login">Fazer login</Link>
      </FormFooter>
    </FormContainer>
  );
}
