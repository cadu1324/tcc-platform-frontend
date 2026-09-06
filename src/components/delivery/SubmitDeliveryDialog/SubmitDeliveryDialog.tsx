import { useState } from 'react';
import { Button, Modal, UploadZone } from '../../../ui';
import { useSubmitDelivery } from '../../../hooks/useSubmitDelivery';
import { DeliveryStatus } from '../../../types';
import type { Delivery } from '../../../types';
import { DialogBody, DialogHint, FileRow, FileName, FileSize, ErrorLine } from './SubmitDeliveryDialog.styles';

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const;
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface SubmitDeliveryDialogProps {
  delivery: Delivery;
  projectId: number;
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function validateFile(file: File): string | null {
  const name = file.name.toLowerCase();
  const hasValidExtension = ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension));
  if (!hasValidExtension) return 'Envie um arquivo PDF, DOC ou DOCX.';
  if (file.size > MAX_SIZE_BYTES) return `O arquivo deve ter no máximo ${MAX_SIZE_MB} MB.`;
  return null;
}

export function SubmitDeliveryDialog({ delivery, projectId }: SubmitDeliveryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const { mutate, isPending } = useSubmitDelivery();

  const label = delivery.status === DeliveryStatus.REJECTED ? 'Reenviar' : 'Enviar';

  function close() {
    setIsOpen(false);
    setFile(null);
    setError('');
  }

  function handleFileSelect(selected: File) {
    const validationError = validateFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setError('');
    setFile(selected);
  }

  function handleConfirm() {
    if (!file) {
      setError('Selecione o arquivo da entrega.');
      return;
    }
    mutate(
      { deliveryId: delivery.id, projectId, file },
      { onSuccess: close, onError: (err) => setError(err.message) },
    );
  }

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        {label}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={`${label} entrega`}
        footer={
          <>
            <Button variant="ghost" onClick={close} disabled={isPending}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={isPending}>
              {isPending ? 'Enviando...' : 'Confirmar envio'}
            </Button>
          </>
        }
      >
        <DialogBody>
          <DialogHint>
            Anexe o arquivo de <strong>{delivery.title}</strong> para avaliação do orientador.
          </DialogHint>

          <UploadZone
            maxSizeMB={MAX_SIZE_MB}
            hint="PDF, DOC ou DOCX"
            onFileSelect={handleFileSelect}
            label={file ? 'Trocar arquivo' : 'Arraste ou clique para selecionar'}
          />

          {file && (
            <FileRow>
              <FileName>{file.name}</FileName>
              <FileSize>{formatSize(file.size)}</FileSize>
            </FileRow>
          )}

          {error && <ErrorLine>{error}</ErrorLine>}
        </DialogBody>
      </Modal>
    </>
  );
}
