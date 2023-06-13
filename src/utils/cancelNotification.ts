import notifee from '@notifee/react-native';

async function cancelNotification(notificationId: string) {
  await notifee.cancelNotification(notificationId);
}

export default cancelNotification;
