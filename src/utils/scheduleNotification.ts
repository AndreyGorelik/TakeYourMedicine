import notifee, {
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import { medsInfo } from 'pages/TreatmentPage';

interface Time {
  time: string;
  id: string;
}

async function notifyOnTime(time: Time, meds: medsInfo) {
  const { time: notificationTime, id: notificationId } = time;

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp:
      new Date(notificationTime) <= new Date()
        ? new Date(notificationTime).getTime() + 1000 * 60 * 60 * 24
        : new Date(notificationTime).getTime(),
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
      id: notificationId,
      title: 'TAKE YOUR PEEL',
      body: `${meds.medsName}, ${meds.medsDescription}`,
      android: {
        channelId: channelId,
        pressAction: {
          id: 'openApp',
          launchActivity: 'default',
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
    },
    trigger
  );
}

export default notifyOnTime;
