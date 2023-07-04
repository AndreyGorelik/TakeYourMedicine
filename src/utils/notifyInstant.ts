import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

async function notifyInstant() {
  const channelId = await notifee.createChannel({
    id: 'TakePill',
    name: 'Schedule Notifications Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'default',
  });

  await notifee.displayNotification({
    id: 'reminderId',
    title: 'BUY MEDS',
    body: 'BUY MEDS',
    android: {
      sound: 'default',
      channelId: channelId,
      pressAction: {
        id: 'opentest',
        launchActivity: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
}

export default notifyInstant;
