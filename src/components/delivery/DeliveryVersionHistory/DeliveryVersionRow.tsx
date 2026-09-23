import { Badge, Button } from '../../../ui';
import { formatDateTime, formatFileSize } from '../../../utils';
import { useDownloadDeliveryVersionFile } from '../../../hooks/useDownloadDeliveryVersionFile';
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

interface DeliveryVersionRowProps {
  deliveryId: number;
  version: DeliveryFileVersion;
  isCurrent: boolean;
}

export function DeliveryVersionRow({ deliveryId, version, isCurrent }: DeliveryVersionRowProps) {
  const { mutate: download, isPending } = useDownloadDeliveryVersionFile();

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
          disabled={isPending}
          onClick={() => download({ deliveryId, versionId: version.id, fileName: version.file_name })}
        >
          {isPending ? 'Baixando...' : 'Baixar arquivo'}
        </Button>
      </VersionActions>
    </VersionRow>
  );
}
