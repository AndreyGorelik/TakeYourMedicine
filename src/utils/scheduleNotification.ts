import notifee, {
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

interface Time {
  time: Date;
  id: string | number;
}

async function TriggerWithTime(time: Time) {
  const notificationTime = time.time;

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: notificationTime.getTime(),
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
  });

  await notifee.createTriggerNotification(
    {
      title: 'TAKE YOUR PEEL',
      body: 'Today at 11:20am',
      android: {
        channelId: channelId,
      },
    },
    trigger
  );
}

export default TriggerWithTime;
