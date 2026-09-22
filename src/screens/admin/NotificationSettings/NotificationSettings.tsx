import { useNotificationSettings } from '../../../hooks/useNotificationSettings';
import { Layout } from '../../../components/layout';
import { Spinner } from '../../../ui';
import { NotificationSettingsForm } from './NotificationSettingsForm';
import {
  SettingsContainer,
  SettingsHeader,
  SettingsTitle,
  SettingsSubtitle,
} from './NotificationSettings.styles';

export function NotificationSettings() {
  const { data, isLoading } = useNotificationSettings();

  return (
    <Layout>
      <SettingsContainer>
        <SettingsHeader>
          <SettingsTitle>Configuração de Notificações</SettingsTitle>
          <SettingsSubtitle>Defina quais eventos geram notificações automáticas na plataforma</SettingsSubtitle>
        </SettingsHeader>

        {isLoading || !data ? <Spinner size="lg" /> : <NotificationSettingsForm initial={data} />}
      </SettingsContainer>
    </Layout>
  );
}
