import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Text from 'components/Text';

import { useAppSelector } from '../hooks/redux-hooks';

import { medsInfo } from './TreatmentPage';

function EditPills(props) {
  const { id } = props.route.params;
  const { schedule } = useAppSelector((state) => state.medsScheduleReducer);

  const itemToRender: medsInfo = schedule.find((item: medsInfo) => (item.id = id));
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const [notificationsOnOff, setNotificationsOnOff] = useState(false);

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleConfirm = (date: Date) => {
    //should update store
    setNotificationTime((prevDates) => {
      const newDates = [...prevDates];
      newDates[openIndex!] = date;
      return newDates;
    });

    handleClose();
  };

  const toggleSwitch = () => {
    setNotificationsOnOff(!notificationsOnOff);
  };

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const renderItem = ({ item, index }: { item: Date; index: number }) => {
    const date = new Date(item);
    const isOpen = openIndex === index;
    return (
      <View>
        <TouchableOpacity onPress={() => handleOpen(index)} style={styles.reminder}>
          <Text>{Number(index + 1).toString()} прием</Text>
          {isOpen && (
            <DatePicker
              modal
              open={true}
              mode="time"
              date={date}
              onConfirm={handleConfirm}
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
        keyExtractor={(item, index) => index.toString()}
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
