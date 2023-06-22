import notifee, { AndroidNotificationSetting, AuthorizationStatus } from '@notifee/react-native';
import { Alert } from 'react-native';

async function checkPermissions() {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    Alert.alert(
      'Enable Notifications',
      'To receive medication reminders, please enable notification permissions for this app.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: async () => await notifee.openNotificationSettings() },
      ]
    );
  }

  if (
    settings.android.alarm == AndroidNotificationSetting.ENABLED &&
    settings.authorizationStatus == AuthorizationStatus.AUTHORIZED
  ) {
    return true;
  } else {
    return false;
  }
}

export default checkPermissions;
