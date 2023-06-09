import notifee, {
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

async function notifyOnTimer() {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5000,
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  const channelId = await notifee.createChannel({
    id: 'TakePill',
    name: 'Schedule Notifications Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'default',
  });

  await notifee.createTriggerNotification(
    {
      id: 'reminderId',
      title: 'TAKE MEDS',
      body: 'DON"T FORGET TO TAKE MEDS',
      android: {
        sound: 'default',
        channelId: channelId,
        pressAction: {
          id: 'opentest',
        },
        actions: [
          {
            pressAction: { id: 'medsTaken' },
            title: 'TAKE IT',
          },
          {
            pressAction: { id: 'medsLater' },
            title: 'REMIND LATER',
          },
        ],
      },
      ios: {
        sound: 'default',
      },
    },
    trigger
  );
}

export default notifyOnTimer;
