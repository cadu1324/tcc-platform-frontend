import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../ui';
import { UserType } from '../types';

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserType[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen><Spinner size="lg" /></LoadingScreen>;
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
