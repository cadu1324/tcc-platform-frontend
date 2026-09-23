import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui';
import type { ButtonProps } from '../../../ui';

interface ViewVersionHistoryButtonProps {
  to: string;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}

export function ViewVersionHistoryButton({ to, size = 'sm', variant = 'ghost' }: ViewVersionHistoryButtonProps) {
  const navigate = useNavigate();

  return (
    <Button type="button" size={size} variant={variant} onClick={() => navigate(to)}>
      Ver histórico
    </Button>
  );
}
