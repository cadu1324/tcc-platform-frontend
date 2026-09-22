import { useMutation } from '@tanstack/react-query';
import { deliveryService } from '../services/deliveryService';
import { saveFileAs } from '../utils/saveFile';

const FALLBACK_NAME = 'entrega';

interface DownloadVersionArgs {
  deliveryId: number;
  versionId: number;
  fileName?: string | null;
}

export function useDownloadDeliveryVersionFile() {
  return useMutation({
    mutationFn: ({ deliveryId, versionId, fileName }: DownloadVersionArgs) =>
      saveFileAs(fileName?.trim() || FALLBACK_NAME, () =>
        deliveryService.downloadVersionFile(deliveryId, versionId),
      ),
  });
}
