import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../ui';
import { NotificationBell } from '../../notification';
import { HeaderContainer, HeaderTitle, HeaderActions } from './Header.styles';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderTitle>TCC Platform</HeaderTitle>

      <HeaderActions>
        <NotificationBell />
        {user && <span>{user.name}</span>}
        <Button variant="ghost" size="sm" onClick={logout}>
          Sair
        </Button>
      </HeaderActions>
    </HeaderContainer>
  );
}
