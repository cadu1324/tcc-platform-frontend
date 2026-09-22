import { useMutation } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';
import { saveFileAs } from '../utils/saveFile';

const FALLBACK_NAME = 'entrega';

interface DownloadArgs {
  deliveryId: number;
  fileName?: string | null;
}

export function useDownloadDeliveryFile() {
  return useMutation({
    mutationFn: ({ deliveryId, fileName }: DownloadArgs) =>
      saveFileAs(fileName?.trim() || FALLBACK_NAME, () => deliveryService.downloadFile(deliveryId)),
  });
}
