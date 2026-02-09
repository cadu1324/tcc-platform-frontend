import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { SidebarContainer, SidebarNav, SidebarLink } from './Sidebar.styles';

interface NavItem {
  label: string;
  path: string;
}

const navItemsByRole: Record<string, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard' },
    { label: 'Meus Projetos', path: '/student/projects' },
  ],
  advisor: [
    { label: 'Dashboard', path: '/advisor/dashboard' },
    { label: 'Meus Orientandos', path: '/advisor/students' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Gerenciar Usuários', path: '/admin/users' },
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
          <SidebarLink
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </SidebarLink>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
}
