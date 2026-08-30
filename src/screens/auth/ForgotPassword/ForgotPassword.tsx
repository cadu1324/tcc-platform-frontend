import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../../../ui';
import {
  AuthContainer,
  AuthCard,
  CardTitle,
  CardDescription,
  FormFields,
  BackLink,
  SuccessBanner,
} from './ForgotPassword.styles';

const schema = z.object({
  email: z.string().email('Informe um e-mail válido'),
});
type FormData = z.infer<typeof schema>;

export function ForgotPassword() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit() {
    // Integração futura com endpoint de recuperação de senha
    setSubmitted(true);
  }

  return (
    <AuthContainer>
      <AuthCard>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>
          Informe seu e-mail cadastrado e enviaremos as instruções para redefinir sua senha.
        </CardDescription>

        {submitted ? (
          <SuccessBanner>
            Instruções enviadas! Verifique sua caixa de entrada.
          </SuccessBanner>
        ) : (
          <FormFields>
            <Input
              label="E-mail"
              type="email"
              fullWidth
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
            </Button>
          </FormFields>
        )}

        <BackLink onClick={() => navigate('/login')}>← Voltar para o login</BackLink>
      </AuthCard>
    </AuthContainer>
  );
}
