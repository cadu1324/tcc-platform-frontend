import { LoginForm } from '../../../components/auth';
import { AuthContainer, AuthCard } from './Login.styles';

export function Login() {
  return (
    <AuthContainer>
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </AuthContainer>
  );
}
