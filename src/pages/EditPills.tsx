import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Text from 'components/Text';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import {
  changePillsInSchedule,
  switchNotifications,
  deleteNotificationTime,
  addNotificationTime,
} from '../store/slices/medsScheduleSlice';

import { medsInfo } from './TreatmentPage';

interface Time {
  id: string;
  time: string;
}

function EditPills(props: any) {
  const { id } = props.route.params;
  const dispatch = useAppDispatch();
  const { schedule } = useAppSelector((state) => state.medsScheduleReducer);

  const { themeStyle } = useTheme();

  const itemToRender: medsInfo = schedule.find((item: medsInfo) => item.id === id);
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleConfirm = (date: Date, dateId: string) => {
    const test = {
      newTime: date.toString(),
      dateId,
      medsId: id,
    };

    dispatch(changePillsInSchedule(test));
    handleClose();
  };

  const toggleSwitch = () => {
    dispatch(switchNotifications(id));
  };

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleDelete = (notificationId: string) => {
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
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.reminder}>
          <Ionicons name="ios-remove-circle-outline" size={24} color={'red'} />
        </TouchableOpacity>
        <View style={styles.timePicker}>
          <TouchableOpacity onPress={() => handleOpen(index)} style={styles.reminder}>
            <Text>{Number(index + 1).toString() + ' прием'}</Text>
            {isOpen && (
              <DatePicker
                modal
                open={true}
                mode="time"
                date={date}
                onConfirm={(newDate) => handleConfirm(newDate, item.id)}
                onCancel={handleClose}
              />
            )}

            <Text>{`${date.getHours()}` + ':' + `${date.getMinutes()}` + '▼'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.view, { backgroundColor: themeStyle.colors.back }]}>
      <Text variant="h3">{itemToRender.medsName}</Text>
      <View style={styles.switchContainer}>
        <Text>Включить уведомления</Text>
        <Switch value={itemToRender.notificationsOnOff} onValueChange={toggleSwitch} />
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
    width: '100%',
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
});

export default EditPills;
