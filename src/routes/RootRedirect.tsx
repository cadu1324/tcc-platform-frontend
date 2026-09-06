import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RootRedirect() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.user_type}/dashboard`} replace />;
  }

  return <Navigate to="/login" replace />;
}
