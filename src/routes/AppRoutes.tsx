import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { RootRedirect } from './RootRedirect';
import { RouteFallback } from './RouteFallback';

const loadAuth = () => import('../screens/auth');
const loadStudent = () => import('../screens/student');
const loadAdvisor = () => import('../screens/advisor');
const loadAdmin = () => import('../screens/admin');

const Login = lazy(() => loadAuth().then((m) => ({ default: m.Login })));
const Register = lazy(() => loadAuth().then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => loadAuth().then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => loadAuth().then((m) => ({ default: m.ResetPassword })));

const StudentDashboard = lazy(() => loadStudent().then((m) => ({ default: m.Dashboard })));
const MyProjects = lazy(() => loadStudent().then((m) => ({ default: m.MyProjects })));
const MyProject = lazy(() => loadStudent().then((m) => ({ default: m.MyProject })));
const Deliveries = lazy(() => loadStudent().then((m) => ({ default: m.Deliveries })));
const Feedbacks = lazy(() => loadStudent().then((m) => ({ default: m.Feedbacks })));
const StudentMessages = lazy(() => loadStudent().then((m) => ({ default: m.Messages })));

const AdvisorDashboard = lazy(() => loadAdvisor().then((m) => ({ default: m.Dashboard })));
const MyStudents = lazy(() => loadAdvisor().then((m) => ({ default: m.MyStudents })));
const AdvisorProjectDetail = lazy(() =>
  loadAdvisor().then((m) => ({ default: m.AdvisorProjectDetail })),
);
const AdvisorDeliveries = lazy(() => loadAdvisor().then((m) => ({ default: m.AdvisorDeliveries })));
const ReviewDelivery = lazy(() => loadAdvisor().then((m) => ({ default: m.ReviewDelivery })));
const AdvisorMessages = lazy(() => loadAdvisor().then((m) => ({ default: m.Messages })));

const AdminDashboard = lazy(() => loadAdmin().then((m) => ({ default: m.Dashboard })));
const ManageUsers = lazy(() => loadAdmin().then((m) => ({ default: m.ManageUsers })));
const UserDetail = lazy(() => loadAdmin().then((m) => ({ default: m.UserDetail })));
const Reports = lazy(() => loadAdmin().then((m) => ({ default: m.Reports })));

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        <Route path="/student/dashboard" element={<PrivateRoute allowedRoles={['student']}><StudentDashboard /></PrivateRoute>} />
        <Route path="/student/projects" element={<PrivateRoute allowedRoles={['student']}><MyProjects /></PrivateRoute>} />
        <Route path="/student/project" element={<PrivateRoute allowedRoles={['student']}><MyProject /></PrivateRoute>} />
        <Route path="/student/deliveries" element={<PrivateRoute allowedRoles={['student']}><Deliveries /></PrivateRoute>} />
        <Route path="/student/feedbacks" element={<PrivateRoute allowedRoles={['student']}><Feedbacks /></PrivateRoute>} />
        <Route path="/student/messages" element={<PrivateRoute allowedRoles={['student']}><StudentMessages /></PrivateRoute>} />

        <Route path="/advisor/dashboard" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorDashboard /></PrivateRoute>} />
        <Route path="/advisor/students" element={<PrivateRoute allowedRoles={['advisor']}><MyStudents /></PrivateRoute>} />
        <Route path="/advisor/students/:projectId" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorProjectDetail /></PrivateRoute>} />
        <Route path="/advisor/deliveries" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorDeliveries /></PrivateRoute>} />
        <Route path="/advisor/review/:deliveryId" element={<PrivateRoute allowedRoles={['advisor']}><ReviewDelivery /></PrivateRoute>} />
        <Route path="/advisor/messages" element={<PrivateRoute allowedRoles={['advisor']}><AdvisorMessages /></PrivateRoute>} />

        <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute allowedRoles={['admin']}><ManageUsers /></PrivateRoute>} />
        <Route path="/admin/users/:userId" element={<PrivateRoute allowedRoles={['admin']}><UserDetail /></PrivateRoute>} />
        <Route path="/admin/reports" element={<PrivateRoute allowedRoles={['admin']}><Reports /></PrivateRoute>} />

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Suspense>
  );
}
