import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../ui';
import { HeaderContainer, HeaderTitle, HeaderActions } from './Header.styles';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderTitle>TCC Platform</HeaderTitle>

      <HeaderActions>
        {user && <span>{user.name}</span>}
        <Button variant="ghost" size="sm" onClick={logout}>
          Sair
        </Button>
      </HeaderActions>
    </HeaderContainer>
  );
}
