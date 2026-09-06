import { Button } from '../../../ui';
import type { ButtonProps } from '../../../ui';
import { useDownloadDeliveryFile } from '../../../hooks/useDownloadDeliveryFile';

interface DownloadFileButtonProps {
  deliveryId: number;
  fileName?: string | null;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}

export function DownloadFileButton({
  deliveryId,
  fileName,
  size = 'sm',
  variant = 'outline',
}: DownloadFileButtonProps) {
  const { mutate, isPending, isError } = useDownloadDeliveryFile();

  const label = isPending
    ? 'Baixando...'
    : isError
      ? 'Erro ao baixar — tentar de novo'
      : fileName
        ? `Baixar ${fileName}`
        : 'Baixar arquivo';

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      disabled={isPending}
      onClick={() => mutate({ deliveryId, fileName })}
    >
      {label}
    </Button>
  );
}
