import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';

import { useAppDispatch } from '../hooks/redux-hooks';
import { RootStackParamList } from '../navigation/AddPills';
import { addNewPillsToSchedule } from '../store/slices/medsScheduleSlice';
import TriggerWithTime from '../utils/scheduleNotification';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

function PillsStepTwo(props: Props) {
  const { navigation } = props;
  const { medsName, medsRegularity } = props.route.params;
  const { goBack } = navigation;
  const dispatch = useAppDispatch();

  const [notificationTime, setNotificationTime] = useState(
    Array.from({ length: medsRegularity }, () => new Date())
  );
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const [notificationsOnOff, setNotificationsOnOff] = useState(false);

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleConfirm = (date: Date) => {
    setNotificationTime((prevDates) => {
      const newDates = [...prevDates];
      newDates[openIndex!] = date;
      return newDates;
    });

    handleClose();
  };

  const saveMedsToSchedule = () => {
    const scheduleItem = {
      medsName,
      medsRegularity,
      notificationTime,
      notificationsOnOff,
      id: uuid.v4(),
    };

    dispatch(addNewPillsToSchedule(scheduleItem));
    if (notificationsOnOff) {
      notificationTime.forEach((item: Date) => {
        TriggerWithTime(item);
      });
    }
    navigation.navigate('Home' as never);
  };

  const toggleSwitch = () => {
    setNotificationsOnOff(!notificationsOnOff);
  };

  const renderItem = ({ item, index }: { item: Date; index: number }) => {
    const isOpen = openIndex === index;
    return (
      <View>
        <TouchableOpacity style={styles.reminder} onPress={() => handleOpen(index)}>
          <Text>{Number(index + 1)} прием</Text>
          {isOpen && (
            <DatePicker
              modal
              open={true}
              mode="time"
              date={item}
              onConfirm={handleConfirm}
              onCancel={handleClose}
            />
          )}
          <Text>{`${item.getHours()}` + ':' + `${item.getMinutes()}` + '▼'}</Text>
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

      <FlatList
        data={notificationTime}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
});

export default PillsStepTwo;
