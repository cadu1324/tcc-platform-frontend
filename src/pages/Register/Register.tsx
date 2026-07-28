import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { Input } from '../../ui/components/Input';
import { Select } from '../../ui/components/Select';
import { useRegister } from '../../hooks/useRegister';
import { UserType } from '../../types';
import {
  ErrorBanner,
  LoginLink,
  RegisterCardWrapper,
  RegisterContainer,
  RegisterForm,
} from './Register.styles';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
    user_type: z.enum([UserType.STUDENT, UserType.ADVISOR], {
      message: 'Selecione o tipo de conta',
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

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isPending, error } = useRegister();

  function onSubmit(data: RegisterFormData) {
    mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        user_type: data.user_type,
      },
      { onSuccess: () => navigate('/auth/login') }
    );
  }

  return (
    <RegisterContainer>
      <RegisterCardWrapper>
        <Card>
          <Card.Header>
            <Card.Title>Criar conta</Card.Title>
          </Card.Header>
          <Card.Content>
            <RegisterForm onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Nome"
                fullWidth
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="E-mail"
                type="email"
                fullWidth
                error={errors.email?.message}
                {...register('email')}
              />
              <Select
                label="Tipo de conta"
                placeholder="Selecione o tipo de conta"
                options={userTypeOptions}
                fullWidth
                error={errors.user_type?.message}
                {...register('user_type')}
              />
              <Input
                label="Senha"
                type="password"
                fullWidth
                error={errors.password?.message}
                {...register('password')}
              />
              <Input
                label="Confirmar senha"
                type="password"
                fullWidth
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              {error && <ErrorBanner>{error.message}</ErrorBanner>}
              <Button type="submit" fullWidth disabled={isPending}>
                {isPending ? 'Criando conta...' : 'Criar conta'}
              </Button>
              <LoginLink to="/auth/login">Já tem conta? Entrar</LoginLink>
            </RegisterForm>
          </Card.Content>
        </Card>
      </RegisterCardWrapper>
    </RegisterContainer>
  );
}
