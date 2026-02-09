import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se já está logado, redireciona para o dashboard correspondente
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.user_type}/dashboard`} replace />;
  }

  return <>{children}</>;
}
