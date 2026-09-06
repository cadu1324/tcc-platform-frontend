import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../../../ui';
import { useResetPassword } from '../../../hooks/useResetPassword';
import {
  AuthContainer,
  AuthCard,
  CardTitle,
  CardDescription,
  FormFields,
  BackLink,
  SuccessBanner,
  ErrorBanner,
} from './ResetPassword.styles';

const schema = z
  .object({
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
type FormData = z.infer<typeof schema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const { mutate, isPending, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    mutate({ token, password: data.password });
  }

  return (
    <AuthContainer>
      <AuthCard>
        <CardTitle>Redefinir senha</CardTitle>

        {!token ? (
          <>
            <CardDescription>Link inválido ou incompleto.</CardDescription>
            <BackLink onClick={() => navigate('/forgot-password')}>
              Solicitar um novo link
            </BackLink>
          </>
        ) : isSuccess ? (
          <>
            <SuccessBanner>Senha redefinida com sucesso.</SuccessBanner>
            <BackLink onClick={() => navigate('/login')}>Ir para o login</BackLink>
          </>
        ) : (
          <>
            <CardDescription>Escolha uma nova senha para sua conta.</CardDescription>
            <FormFields>
              {error && <ErrorBanner>{error.message}</ErrorBanner>}
              <Input
                label="Nova senha"
                type="password"
                fullWidth
                {...register('password')}
                error={errors.password?.message}
              />
              <Input
                label="Confirmar senha"
                type="password"
                fullWidth
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                onClick={handleSubmit(onSubmit)}
              >
                {isPending ? 'Salvando...' : 'Redefinir senha'}
              </Button>
            </FormFields>
            <BackLink onClick={() => navigate('/login')}>← Voltar para o login</BackLink>
          </>
        )}
      </AuthCard>
    </AuthContainer>
  );
}
