import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Select } from '../../../ui';
import { UserType } from '../../../types';
import { FormContainer, FormTitle, FormFooter, ErrorMessage } from './RegisterForm.styles';

interface RegisterFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    user_type: UserType;
  }) => Promise<void>;
  error?: string | null;
}

const userTypeOptions = [
  { value: 'student', label: 'Aluno' },
  { value: 'advisor', label: 'Orientador' },
];

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ name, email, password, user_type: userType });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Cadastro</FormTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Input
        label="Nome completo"
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Select
        label="Tipo de usuário"
        options={userTypeOptions}
        value={userType}
        onChange={(e) => setUserType(e.target.value as UserType)}
      />

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </Button>

      <FormFooter>
        Já tem conta? <Link to="/login">Entrar</Link>
      </FormFooter>
    </FormContainer>
  );
}
