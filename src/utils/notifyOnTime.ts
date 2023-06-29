import notifee, {
  AndroidImportance,
  AndroidVisibility,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import { DoctorVisit } from 'pages/DoctorAppointment';

async function notifyOnTime(info: DoctorVisit) {
  console.log(info);
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: new Date(info!.notificationTimeAndDate!).getTime(),
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  const channelId = await notifee.createChannel({
    id: 'VisitDoctor',
    name: 'Doctors appointments',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.createTriggerNotification(
    {
      id: info.id,
      title: 'TAKE YOUR PEEL',
      body: `${info.name}, ${info.appointmentDate}`,
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
