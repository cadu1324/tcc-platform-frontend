import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { Login, Register, ForgotPassword } from '../screens/auth';

import {
  Dashboard as StudentDashboard,
  MyProjects,
  MyProject,
  Deliveries,
  Feedbacks,
  Messages,
} from '../screens/student';

import {
  Dashboard as AdvisorDashboard,
  MyStudents,
  AdvisorDeliveries,
  ReviewDelivery,
  Messages as AdvisorMessages,
} from '../screens/advisor';

import { Dashboard as AdminDashboard, ManageUsers, UserDetail, Reports } from '../screens/admin';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

      <Route path="/student/dashboard" element={<PrivateRoute allowedRoles={['student']}><StudentDashboard /></PrivateRoute>} />
      <Route path="/student/projects" element={<PrivateRoute allowedRoles={['student']}><MyProjects /></PrivateRoute>} />
      <Route path="/student/project" element={<PrivateRoute allowedRoles={['student']}><MyProject /></PrivateRoute>} />
      <Route path="/student/deliveries" element={<PrivateRoute allowedRoles={['student']}><Deliveries /></PrivateRoute>} />
      <Route path="/student/feedbacks" element={<PrivateRoute allowedRoles={['student']}><Feedbacks /></PrivateRoute>} />
      <Route path="/student/messages" element={<PrivateRoute allowedRoles={['student']}><Messages /></PrivateRoute>} />

      <Route path="/advisor/dashboard" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorDashboard /></PrivateRoute>} />
      <Route path="/advisor/students" element={<PrivateRoute allowedRoles={['advisor']}><MyStudents /></PrivateRoute>} />
      <Route path="/advisor/deliveries" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorDeliveries /></PrivateRoute>} />
      <Route path="/advisor/review/:deliveryId" element={<PrivateRoute allowedRoles={['advisor']}><ReviewDelivery /></PrivateRoute>} />
      <Route path="/advisor/messages" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorMessages /></PrivateRoute>} />

      <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute allowedRoles={['admin']}><ManageUsers /></PrivateRoute>} />
      <Route path="/admin/users/:userId" element={<PrivateRoute allowedRoles={['admin']}><UserDetail /></PrivateRoute>} />
      <Route path="/admin/reports" element={<PrivateRoute allowedRoles={['admin']}><Reports /></PrivateRoute>} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
