import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { Input } from '../../ui/components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useLogin } from '../../hooks/useLogin';
import {
  ErrorBanner,
  LoginCardWrapper,
  LoginContainer,
  LoginForm,
  WelcomeText,
} from './Login.styles';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, logout } = useAuth();
  const { mutate, isPending, error } = useLogin();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate({ email, password });
  }

  return (
    <LoginContainer>
      <LoginCardWrapper>
        <Card>
          <Card.Header>
            <Card.Title>{user ? 'Login realizado' : 'Entrar'}</Card.Title>
          </Card.Header>
          <Card.Content>
            {user ? (
              <>
                <WelcomeText>
                  Bem-vindo(a), {user.name} ({user.user_type})
                </WelcomeText>
                <Button variant="outline" fullWidth onClick={logout}>
                  Sair
                </Button>
              </>
            ) : (
              <LoginForm onSubmit={handleSubmit}>
                <Input
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  required
                />
                <Input
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  required
                />
                {error && <ErrorBanner>{error.message}</ErrorBanner>}
                <Button type="submit" fullWidth disabled={isPending}>
                  {isPending ? 'Entrando...' : 'Entrar'}
                </Button>
              </LoginForm>
            )}
          </Card.Content>
        </Card>
      </LoginCardWrapper>
    </LoginContainer>
  );
}
