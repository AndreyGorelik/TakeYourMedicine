import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../hooks/redux-hooks';
import { RootStackParamList } from '../navigation/AddPills';
import { addNewPillsToSchedule } from '../store/slices/medsScheduleSlice';

// import TriggerWithTime from '../utils/scheduleNotification';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

interface Time {
  id: string;
  time: Date;
}

function PillsStepTwo(props: Props) {
  const { navigation } = props;
  const { medsName, medsRegularity } = props.route.params;
  const { goBack } = navigation;
  const dispatch = useAppDispatch();

  const [notificationTime, setNotificationTime] = useState<Time[]>(
    Array.from({ length: medsRegularity }, () => ({
      id: uuid.v4().toString(),
      time: new Date(),
    }))
  );

  useEffect(() => {
    setNotificationTime(
      Array.from({ length: medsRegularity }, () => ({
        id: uuid.v4().toString(),
        time: new Date(),
      }))
    );
  }, [medsRegularity]);

  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const [notificationsOnOff, setNotificationsOnOff] = useState(false);

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleConfirm = (date: Date, id: string) => {
    const newNoti = notificationTime.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          time: date,
        };
      } else {
        return item;
      }
    });
    setNotificationTime(newNoti);

    handleClose();
  };

  const saveMedsToSchedule = () => {
    const notificationTimeString = notificationTime.map((item) => {
      return {
        id: item.id,
        time: item.time.toString(),
      };
    });

    const scheduleItem = {
      medsName,
      medsRegularity,
      notificationTime: notificationTimeString,
      notificationsOnOff,
      id: uuid.v4(),
    };

    dispatch(addNewPillsToSchedule(scheduleItem));
    // if (notificationsOnOff) {
    //   notificationTime.forEach((item: Time) => {
    //     TriggerWithTime(item);
    //   });
    // }
    navigation.navigate('Home' as never);
  };

  const toggleSwitch = () => {
    setNotificationsOnOff(!notificationsOnOff);
  };

  const handleAddNewTime = () => {
    setNotificationTime([
      ...notificationTime,
      {
        id: uuid.v4().toString(),
        time: new Date(),
      },
    ]);
  };

  const handleDelete = (id: string) => {
    const timeIndex = notificationTime.findIndex((item) => item.id === id);
    setNotificationTime([
      ...notificationTime.slice(0, timeIndex),
      ...notificationTime.slice(timeIndex + 1),
    ]);
  };

  const renderItem = ({ item, index }: { item: Time; index: number }) => {
    const isOpen = openIndex === index;
    return (
      <View style={styles.time}>
        {medsRegularity > 3 && (
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.reminder}>
            <Ionicons name="ios-remove-circle-outline" size={24} color={'red'} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.reminder} onPress={() => handleOpen(index)}>
          <Text>{Number(index + 1)} прием</Text>
          {isOpen && (
            <DatePicker
              modal
              open={true}
              mode="time"
              date={item.time}
              onConfirm={(date) => handleConfirm(date, item.id)}
              onCancel={handleClose}
            />
          )}
          <Text>{`${item.time.getHours()}` + ':' + `${item.time.getMinutes()}` + '▼'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <View style={styles.switchContainer}>
        <Text>Включить уведомления</Text>
        <Switch value={notificationsOnOff} onValueChange={toggleSwitch} />
      </View>
      <FlatList data={notificationTime} keyExtractor={(item) => item.id} renderItem={renderItem} />
      {medsRegularity > 3 && (
        <TouchableOpacity style={styles.addNotification} onPress={handleAddNewTime}>
          <Ionicons name="ios-add-circle-outline" size={24} color={'green'} />
          <Text>Добавить напоминание</Text>
        </TouchableOpacity>
      )}
      <Button title="back" onPress={() => goBack()} />
      <Button title="save" onPress={saveMedsToSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 15,
  },
  reminder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  addNotification: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PillsStepTwo;
