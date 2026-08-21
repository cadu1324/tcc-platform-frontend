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

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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

const FileIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
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

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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
    { label: 'Meu Projeto', path: '/student/project', icon: <FolderIcon /> },
    { label: 'Entregas', path: '/student/deliveries', icon: <PackageIcon /> },
    { label: 'Feedbacks', path: '/student/feedbacks', icon: <StarIcon /> },
    { label: 'Mensagens', path: '/student/messages', icon: <MessageIcon /> },
  ],
  advisor: [
    { label: 'Dashboard', path: '/advisor/dashboard', icon: <DashboardIcon /> },
    { label: 'Meus Orientandos', path: '/advisor/students', icon: <UsersIcon /> },
    { label: 'Entregas para Revisar', path: '/advisor/deliveries', icon: <FileIcon /> },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    { label: 'Gerenciar Usuários', path: '/admin/users', icon: <ManageUsersIcon /> },
    { label: 'Relatórios', path: '/admin/reports', icon: <ChartIcon /> },
  ],
};

export function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navItems = navItemsByRole[user.user_type] ?? [];

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
