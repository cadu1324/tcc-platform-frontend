import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserType } from '../types';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserType[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    // TODO: Substituir por componente de loading
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.user_type)) {
    // Redireciona para o dashboard do tipo de usuário
    return <Navigate to={`/${user.user_type}/dashboard`} replace />;
  }

  return <>{children}</>;
}
