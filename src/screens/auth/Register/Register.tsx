import { RegisterForm } from '../../../components/auth';
import { AuthContainer, AuthCard } from './Register.styles';

export function Register() {
  return (
    <AuthContainer>
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </AuthContainer>
  );
}
