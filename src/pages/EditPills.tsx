import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PhotoWithModal from 'components/PhotoWithModal';
import Text from 'components/Text';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import {
  changePillsInSchedule,
  switchNotifications,
  deleteNotificationTime,
  addNotificationTime,
} from '../store/slices/medsScheduleSlice';
import convertTime from '../utils/Time';

import { medsInfo } from './TreatmentPage';

interface Time {
  id: string;
  time: string;
}

function EditPills(props: any) {
  const { id } = props.route.params;
  const dispatch = useAppDispatch();

  const itemToRender: medsInfo = useAppSelector((state) =>
    state.medsScheduleReducer.schedule.find((item: medsInfo) => item.id === id)
  );

  const { themeStyle } = useTheme();

  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const closeDatePicker = () => {
    setOpenIndex(null);
  };

  const confirmDate = (date: Date, dateId: string) => {
    const test = {
      newTime: date.toString(),
      dateId,
      medsId: id,
    };

    dispatch(changePillsInSchedule(test));
    closeDatePicker();
  };

  const togglePush = () => {
    dispatch(switchNotifications(id));
  };

  const openDatePicker = (index: number) => {
    setOpenIndex(index);
  };

  const deleteTime = (notificationId: string) => {
    dispatch(deleteNotificationTime({ id, notificationId }));
  };

  const handleAddNewTime = () => {
    dispatch(addNotificationTime(id));
  };

  const renderItem = ({ item, index }: { item: Time; index: number }) => {
    const date = new Date(item.time);
    const isOpen = openIndex === index;
    return (
      <View style={styles.time}>
        <TouchableOpacity onPress={() => deleteTime(item.id)} style={styles.reminder}>
          <Ionicons name="ios-remove-circle-outline" size={24} color={'red'} />
        </TouchableOpacity>
        <View style={styles.timePicker}>
          <TouchableOpacity onPress={() => openDatePicker(index)} style={styles.reminder}>
            <Text>{Number(index + 1).toString() + ' прием'}</Text>
            {isOpen && (
              <DatePicker
                modal
                open={true}
                mode="time"
                date={date}
                onConfirm={(newDate) => confirmDate(newDate, item.id)}
                onCancel={closeDatePicker}
              />
            )}
            <Text>{convertTime(item.time) + '▼'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.view, { backgroundColor: themeStyle.colors.back }]}>
      <Text variant="h3">{itemToRender.medsName}</Text>
      <PhotoWithModal id={id} />
      <View style={styles.switchContainer}>
        <Text>Включить уведомления</Text>
        <Switch value={itemToRender.notificationsOnOff} onValueChange={togglePush} />
      </View>
      <FlatList
        data={itemToRender.notificationTime}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addNotification} onPress={handleAddNewTime}>
        <Ionicons name="ios-add-circle-outline" size={24} color={'green'} />
        <Text>Добавить напоминание</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reminder: {
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
    gap: 10,
  },
  timePicker: {
    flex: 1,
    justifyContent: 'space-between',
  },
  medsImage: {
    width: 100,
    height: 100,
  },
});

export default EditPills;
