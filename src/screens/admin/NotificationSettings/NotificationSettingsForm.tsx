import { useState } from 'react';
import { useUpdateNotificationSettings } from '../../../hooks/useUpdateNotificationSettings';
import { Card, CardContent, Switch, Select, Button } from '../../../ui';
import { EmailDigestFrequency } from '../../../types';
import type { NotificationSettings as NotificationSettingsData } from '../../../types';
import {
  SectionLabel,
  ToggleRow,
  ToggleLabel,
  FrequencyBlock,
  FrequencyLabel,
  FooterRow,
  SavedHint,
} from './NotificationSettings.styles';

const frequencyOptions = [
  { value: EmailDigestFrequency.DAILY, label: 'Diário' },
  { value: EmailDigestFrequency.WEEKLY, label: 'Semanal' },
];

type DraftSettings = Omit<NotificationSettingsData, 'id' | 'updated_at'>;

function toDraft(data: NotificationSettingsData): DraftSettings {
  return {
    notify_student_on_feedback: data.notify_student_on_feedback,
    notify_advisor_on_delivery_submitted: data.notify_advisor_on_delivery_submitted,
    notify_admin_on_milestone_overdue: data.notify_admin_on_milestone_overdue,
    email_copy_enabled: data.email_copy_enabled,
    email_digest_frequency: data.email_digest_frequency,
  };
}

interface NotificationSettingsFormProps {
  initial: NotificationSettingsData;
}

export function NotificationSettingsForm({ initial }: NotificationSettingsFormProps) {
  const [draft, setDraft] = useState<DraftSettings>(() => toDraft(initial));
  const { mutate: updateSettings, isPending, isSuccess } = useUpdateNotificationSettings();

  function updateField<K extends keyof DraftSettings>(key: K, value: DraftSettings[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card>
      <CardContent>
        <SectionLabel>Eventos do sistema</SectionLabel>

        <ToggleRow>
          <ToggleLabel>Notificar aluno quando um novo feedback for registrado</ToggleLabel>
          <Switch
            checked={draft.notify_student_on_feedback}
            onChange={(e) => updateField('notify_student_on_feedback', e.target.checked)}
          />
        </ToggleRow>

        <ToggleRow>
          <ToggleLabel>Notificar orientador quando uma nova entrega for submetida</ToggleLabel>
          <Switch
            checked={draft.notify_advisor_on_delivery_submitted}
            onChange={(e) => updateField('notify_advisor_on_delivery_submitted', e.target.checked)}
          />
        </ToggleRow>

        <ToggleRow>
          <ToggleLabel>Notificar administrador quando um marco estiver atrasado</ToggleLabel>
          <Switch
            checked={draft.notify_admin_on_milestone_overdue}
            onChange={(e) => updateField('notify_admin_on_milestone_overdue', e.target.checked)}
          />
        </ToggleRow>

        <ToggleRow>
          <ToggleLabel>Enviar cópia das notificações por e-mail</ToggleLabel>
          <Switch
            checked={draft.email_copy_enabled}
            onChange={(e) => updateField('email_copy_enabled', e.target.checked)}
          />
        </ToggleRow>

        <FrequencyBlock>
          <FrequencyLabel>Frequência do resumo por e-mail</FrequencyLabel>
          <Select
            fullWidth
            options={frequencyOptions}
            value={draft.email_digest_frequency}
            onChange={(e) =>
              updateField('email_digest_frequency', e.target.value as DraftSettings['email_digest_frequency'])
            }
          />
        </FrequencyBlock>

        <FooterRow>
          {isSuccess && <SavedHint>Alterações salvas.</SavedHint>}
          <Button onClick={() => updateSettings(draft)} disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </FooterRow>
      </CardContent>
    </Card>
  );
}
