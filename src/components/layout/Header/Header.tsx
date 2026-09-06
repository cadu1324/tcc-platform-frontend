import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from '../../../ui';
import type { AvatarScheme } from '../../../ui';
import { NotificationBell } from '../../notification';
import { ThemeToggle } from './ThemeToggle';
import type { UserType } from '../../../types';
import {
  HeaderContainer,
  Brand,
  BrandMark,
  BrandText,
  BrandName,
  BrandTagline,
  HeaderActions,
  Divider,
  IconButton,
  UserChip,
  UserMeta,
  UserName,
  UserRole,
} from './Header.styles';

const roleLabel: Record<UserType, string> = {
  student: 'Aluno',
  advisor: 'Orientador',
  admin: 'Administrador',
};

const roleScheme: Record<UserType, AvatarScheme> = {
  student: 'blue',
  advisor: 'amber',
  admin: 'red',
};

const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3 1 8.5l11 5.5 9-4.5V16h2V8.5L12 3zM5 13.2v3.3c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.3l-7 3.5-7-3.5z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <Brand>
        <BrandMark>
          <CapIcon />
        </BrandMark>
        <BrandText>
          <BrandName>TCC Platform</BrandName>
          <BrandTagline>Gestão de Projetos Acadêmicos</BrandTagline>
        </BrandText>
      </Brand>

      <HeaderActions>
        <NotificationBell />
        <ThemeToggle />
        <Divider />
        {user && (
          <UserChip>
            <Avatar name={user.name} size="sm" scheme={roleScheme[user.user_type]} />
            <UserMeta>
              <UserName>{user.name}</UserName>
              <UserRole>{roleLabel[user.user_type]}</UserRole>
            </UserMeta>
          </UserChip>
        )}
        <IconButton type="button" onClick={logout} aria-label="Sair" title="Sair">
          <LogoutIcon />
        </IconButton>
      </HeaderActions>
    </HeaderContainer>
  );
}
