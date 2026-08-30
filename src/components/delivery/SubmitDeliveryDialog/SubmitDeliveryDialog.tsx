import { useState } from 'react';
import { Button, Modal, Input } from '../../../ui';
import { useSubmitDelivery } from '../../../hooks/useSubmitDelivery';
import { DeliveryStatus } from '../../../types';
import type { Delivery } from '../../../types';
import { DialogBody, DialogHint } from './SubmitDeliveryDialog.styles';

interface SubmitDeliveryDialogProps {
  delivery: Delivery;
  projectId: number;
}

export function SubmitDeliveryDialog({ delivery, projectId }: SubmitDeliveryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending } = useSubmitDelivery();

  const label = delivery.status === DeliveryStatus.REJECTED ? 'Reenviar' : 'Enviar';

  function close() {
    setIsOpen(false);
    setFileUrl('');
    setError('');
  }

  function handleConfirm() {
    if (!fileUrl.trim()) {
      setError('Informe o link do arquivo');
      return;
    }
    mutate(
      { deliveryId: delivery.id, projectId, fileUrl: fileUrl.trim() },
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
            Confirme o envio de <strong>{delivery.title}</strong> para avaliação do orientador.
          </DialogHint>
          <Input
            label="Link do arquivo"
            placeholder="https://..."
            fullWidth
            value={fileUrl}
            onChange={(event) => setFileUrl(event.target.value)}
            error={error}
          />
        </DialogBody>
      </Modal>
    </>
  );
}
