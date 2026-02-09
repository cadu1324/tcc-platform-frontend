import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../ui';
import { FormContainer, FormTitle, FormFooter, ErrorMessage } from './LoginForm.styles';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string | null;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(email, password);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Entrar</FormTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>

      <FormFooter>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </FormFooter>
    </FormContainer>
  );
}
