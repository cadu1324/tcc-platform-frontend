import { Button } from '../../../ui';
import type { ButtonProps } from '../../../ui';
import { useDownloadDeliveryFile } from '../../../hooks/useDownloadDeliveryFile';
import { useDownloadStatus, type DownloadStatus } from '../../../hooks/useDownloadStatus';

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
  const mutation = useDownloadDeliveryFile();
  const status = useDownloadStatus(mutation);

  const label = {
    idle: fileName ? `Baixar ${fileName}` : 'Baixar arquivo',
    pending: 'Baixando...',
    saved: 'Arquivo salvo ✓',
    error: 'Erro ao baixar — tentar de novo',
  } as const satisfies Record<DownloadStatus, string>;

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      disabled={status === 'pending'}
      onClick={() => mutation.mutate({ deliveryId, fileName })}
    >
      {label[status]}
    </Button>
  );
}
