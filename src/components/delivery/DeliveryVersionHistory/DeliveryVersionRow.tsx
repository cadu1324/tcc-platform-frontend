import { Badge, Button } from '../../../ui';
import { formatDateTime, formatFileSize } from '../../../utils';
import { useDownloadDeliveryVersionFile } from '../../../hooks/useDownloadDeliveryVersionFile';
import { useDownloadStatus, type DownloadStatus } from '../../../hooks/useDownloadStatus';
import type { DeliveryFileVersion } from '../../../types';
import {
  VersionRow,
  VersionBadge,
  VersionInfo,
  VersionMeta,
  VersionSubMeta,
  CurrentTag,
  VersionActions,
} from './DeliveryVersionHistory.styles';

const versionStatusLabel: Record<string, string> = {
  pending: 'Pendente',
  submitted: 'Aguardando revisão',
  approved: 'Aprovada',
  rejected: 'Devolvida para ajustes',
};

const versionStatusVariant: Record<string, 'default' | 'warning' | 'success' | 'error'> = {
  pending: 'default',
  submitted: 'warning',
  approved: 'success',
  rejected: 'error',
};

const downloadLabel = {
  idle: 'Baixar arquivo',
  pending: 'Baixando...',
  saved: 'Arquivo salvo ✓',
  error: 'Erro ao baixar — tentar de novo',
} as const satisfies Record<DownloadStatus, string>;

interface DeliveryVersionRowProps {
  deliveryId: number;
  version: DeliveryFileVersion;
  isCurrent: boolean;
}

export function DeliveryVersionRow({ deliveryId, version, isCurrent }: DeliveryVersionRowProps) {
  const mutation = useDownloadDeliveryVersionFile();
  const status = useDownloadStatus(mutation);

  return (
    <VersionRow>
      <VersionBadge>v{version.version}</VersionBadge>

      <VersionInfo>
        <VersionMeta>Enviado em {formatDateTime(version.created_at)}</VersionMeta>
        <VersionSubMeta>Tamanho do arquivo: {formatFileSize(version.size_bytes)}</VersionSubMeta>
        {isCurrent && <CurrentTag>Versão atual</CurrentTag>}
      </VersionInfo>

      <VersionActions>
        <Badge variant={versionStatusVariant[version.status]} size="sm">
          {versionStatusLabel[version.status]}
        </Badge>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={status === 'pending'}
          onClick={() =>
            mutation.mutate({ deliveryId, versionId: version.id, fileName: version.file_name })
          }
        >
          {downloadLabel[status]}
        </Button>
      </VersionActions>
    </VersionRow>
  );
}
