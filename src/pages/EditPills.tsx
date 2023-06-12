import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Text from 'components/Text';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { changePillsInSchedule } from '../store/slices/medsScheduleSlice';

import { medsInfo } from './TreatmentPage';

interface Time {
  id: string;
  time: string;
}

function EditPills(props: any) {
  // eslint-disable-next-line react/prop-types
  const { id } = props.route.params;
  const dispatch = useAppDispatch();
  const { schedule } = useAppSelector((state) => state.medsScheduleReducer);

  const itemToRender: medsInfo = schedule.find((item: medsInfo) => item.id === id);
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const [notificationsOnOff, setNotificationsOnOff] = useState(false);

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
    setNotificationsOnOff(!notificationsOnOff);
  };

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const renderItem = ({ item, index }: { item: Time; index: number }) => {
    const date = new Date(item.time);
    const isOpen = openIndex === index;
    return (
      <View>
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
    );
  };
  return (
    <View style={styles.view}>
      <Text variant="h3">{itemToRender.medsName}</Text>
      <View style={styles.switchContainer}>
        <Text>Включить уведомления</Text>
        <Switch value={notificationsOnOff} onValueChange={toggleSwitch} />
      </View>
      <FlatList
        data={itemToRender.notificationTime}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reminder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default EditPills;
