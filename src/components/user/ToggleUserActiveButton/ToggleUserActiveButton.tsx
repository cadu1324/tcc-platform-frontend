import { Button } from '../../../ui';
import { useAuth } from '../../../hooks/useAuth';
import { useUpdateUser } from '../../../hooks/useUpdateUser';
import type { User } from '../../../types';

interface ToggleUserActiveButtonProps {
  user: User;
}

export function ToggleUserActiveButton({ user }: ToggleUserActiveButtonProps) {
  const { user: currentUser } = useAuth();
  const { mutate, isPending } = useUpdateUser();

  const isSelf = user.id === currentUser?.id;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    mutate({ id: user.id, data: { is_active: !user.is_active } });
  }

  return (
    <Button
      type="button"
      size="sm"
      variant={user.is_active ? 'ghost' : 'outline'}
      disabled={isPending || isSelf}
      title={isSelf ? 'Você não pode desativar a própria conta' : undefined}
      onClick={handleClick}
    >
      {user.is_active ? 'Desativar' : 'Ativar'}
    </Button>
  );
}
