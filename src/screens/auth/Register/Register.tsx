import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { RegisterForm } from '../../../components/auth';
import { UserType } from '../../../types';
import { RegisterContainer, RegisterCard } from './Register.styles';

export function Register() {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(data: {
    name: string;
    email: string;
    password: string;
    user_type: UserType;
  }) {
    try {
      setError(null);
      await register(data);
    } catch {
      setError('Erro ao criar conta. Tente novamente.');
    }
  }

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterForm onSubmit={handleRegister} error={error} />
      </RegisterCard>
    </RegisterContainer>
  );
}
