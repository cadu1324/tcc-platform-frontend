import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../ui';
import { useLogin } from '../../../hooks/useLogin';
import {
  FormContainer,
  FormLogo,
  FormSubtitle,
  RememberRow,
  ForgotLink,
  FormFooter,
  FormDivider,
  FormFootnote,
  ErrorBanner,
} from './LoginForm.styles';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: LoginFormData): void {
    mutate({ email: data.email, password: data.password });
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormLogo>TCC Platform</FormLogo>
      <FormSubtitle>Gestão de Projetos Acadêmicos · Uni-FACEF</FormSubtitle>

      {error && <ErrorBanner>{error.message}</ErrorBanner>}

      <Input
        label="E-mail institucional"
        type="email"
        fullWidth
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        fullWidth
        error={errors.password?.message}
        {...register('password')}
      />

      <RememberRow>
        <label>
          <input type="checkbox" /> Lembrar acesso
        </label>
        <ForgotLink to="/forgot-password">Esqueci a senha</ForgotLink>
      </RememberRow>

      <Button type="submit" fullWidth disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>

      <FormFooter>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </FormFooter>

      <FormDivider />
      <FormFootnote>Uni-FACEF · Bacharelado em Sistemas de Informação</FormFootnote>
    </FormContainer>
  );
}
