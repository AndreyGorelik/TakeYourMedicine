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

async function notifyOnTimeSchedule(time: Time, meds: medsInfo) {
  const { time: notificationTime, id: notificationId } = time;

  await notifee.requestPermission();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp:
      new Date(notificationTime) <= new Date()
        ? (() => {
            const newHours = new Date(notificationTime).getHours();
            const newMinutes = new Date(notificationTime).getMinutes();
            const newD = new Date();
            newD.setHours(newHours);
            newD.setMinutes(newMinutes);
            newD.setSeconds(0);
            newD.setDate(newD.getDate() + 1);
            return newD.getTime();
          })()
        : (() => {
            const newD = new Date(notificationTime);
            newD.setSeconds(0);
            return newD.getTime();
          })(),
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

  await notifee.setNotificationCategories([
    {
      id: 'message',
      actions: [
        {
          id: 'medsTaken',
          title: 'TAKE IT',
        },
        {
          id: 'medsLater',
          title: 'REMIND LATER',
        },
      ],
    },
  ]);

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title: 'TAKE YOUR PEEL',
      body: `${meds.medsName}, ${meds.medsDescription}`,
      data: { medsId: meds.id },
      android: {
        sound: 'default',
        channelId: channelId,
        pressAction: {
          id: 'openMedsScheduleItem',
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
      ios: {
        sound: 'default',
        categoryId: 'message',
      },
    },
    trigger
  );
}

export default notifyOnTimeSchedule;
