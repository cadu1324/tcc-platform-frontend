import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { LoginForm } from '../../../components/auth';
import { LoginContainer, LoginCard } from './Login.styles';

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      setError(null);
      await login({ email, password });
    } catch {
      setError('E-mail ou senha inválidos.');
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginForm onSubmit={handleLogin} error={error} />
      </LoginCard>
    </LoginContainer>
  );
}
