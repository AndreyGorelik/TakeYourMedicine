import notifee, { AndroidNotificationSetting, AuthorizationStatus } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

async function checkPermissions() {
  if (Platform.OS === 'ios') {
    const settings = await notifee.requestPermission({
      sound: true,
      announcement: true,
    });

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      return true;
    } else {
      Alert.alert(
        'Enable Notifications',
        'To receive reminders, please enable notification in the phone settings manually',
        [{ text: 'OK', onPress: async () => await notifee.openNotificationSettings() }]
      );
      return false;
    }
  } else {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      Alert.alert(
        'Enable Notifications',
        'To receive reminders, please enable notification permissions for this app.',
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
}

export default checkPermissions;
