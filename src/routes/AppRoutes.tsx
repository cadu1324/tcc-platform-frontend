import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// Screens - Auth
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';

// Screens - Student
import { Dashboard as StudentDashboard } from '../screens/student/Dashboard';
import { MyProjects } from '../screens/student/MyProjects';

// Screens - Advisor
import { Dashboard as AdvisorDashboard } from '../screens/advisor/Dashboard';
import { MyStudents } from '../screens/advisor/MyStudents';

// Screens - Admin
import { Dashboard as AdminDashboard } from '../screens/admin/Dashboard';
import { ManageUsers } from '../screens/admin/ManageUsers';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rotas do aluno */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/projects"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <MyProjects />
            </PrivateRoute>
          }
        />

        {/* Rotas do orientador */}
        <Route
          path="/advisor/dashboard"
          element={
            <PrivateRoute allowedRoles={['advisor']}>
              <AdvisorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/advisor/students"
          element={
            <PrivateRoute allowedRoles={['advisor']}>
              <MyStudents />
            </PrivateRoute>
          }
        />

        {/* Rotas do admin */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <ManageUsers />
            </PrivateRoute>
          }
        />

        {/* Rota padrão */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
