import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { SidebarContainer, SidebarNav, SidebarItem, SidebarLabel } from './Sidebar.styles';

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="9" cy="8" r="4" />
    <path d="M2 20v-2a7 7 0 0 1 14 0v2" />
    <line x1="19" y1="8" x2="23" y2="8" />
    <line x1="21" y1="6" x2="21" y2="10" />
  </svg>
);

const ManageUsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="9" cy="8" r="4" />
    <path d="M2 20v-2a7 7 0 0 1 14 0v2" />
    <circle cx="19" cy="18" r="3" />
    <path d="M19 15v-1m0 7v-1m-3-3h1m5 0h1" />
  </svg>
);

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItemsByRole: Record<string, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: <DashboardIcon /> },
    { label: 'Meus Projetos', path: '/student/projects', icon: <ProjectIcon /> },
  ],
  advisor: [
    { label: 'Dashboard', path: '/advisor/dashboard', icon: <DashboardIcon /> },
    { label: 'Meus Orientandos', path: '/advisor/students', icon: <UsersIcon /> },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    { label: 'Gerenciar Usuários', path: '/admin/users', icon: <ManageUsersIcon /> },
  ],
};

export function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navItems = navItemsByRole[user.user_type] || [];

  return (
    <SidebarContainer>
      <SidebarNav>
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            {item.icon}
            <SidebarLabel>{item.label}</SidebarLabel>
          </SidebarItem>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
}
