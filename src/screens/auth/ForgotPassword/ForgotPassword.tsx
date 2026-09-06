import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../../../ui';
import { useForgotPassword } from '../../../hooks/useForgotPassword';
import {
  AuthContainer,
  AuthCard,
  CardTitle,
  CardDescription,
  FormFields,
  BackLink,
  SuccessBanner,
  ErrorBanner,
} from './ForgotPassword.styles';

const schema = z.object({
  email: z.string().email('Informe um e-mail válido'),
});
type FormData = z.infer<typeof schema>;

export function ForgotPassword() {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    mutate(data.email);
  }

  return (
    <AuthContainer>
      <AuthCard>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>
          Informe seu e-mail cadastrado e enviaremos as instruções para redefinir sua senha.
        </CardDescription>

        {isSuccess ? (
          <SuccessBanner>
            Se houver uma conta com esse e-mail, enviamos as instruções de redefinição.
          </SuccessBanner>
        ) : (
          <FormFields>
            {error && <ErrorBanner>{error.message}</ErrorBanner>}
            <Input
              label="E-mail"
              type="email"
              fullWidth
              {...register('email')}
              error={errors.email?.message}
            />
            <Button type="submit" fullWidth disabled={isPending} onClick={handleSubmit(onSubmit)}>
              {isPending ? 'Enviando...' : 'Enviar instruções'}
            </Button>
          </FormFields>
        )}

        <BackLink onClick={() => navigate('/login')}>← Voltar para o login</BackLink>
      </AuthCard>
    </AuthContainer>
  );
}
