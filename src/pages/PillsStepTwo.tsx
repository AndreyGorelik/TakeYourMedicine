import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { RootStackParamList } from '../navigation/AddPills';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

interface Notifications {
  [x: string]: Date;
}

interface Reminder {
  [x: string]: any;
}

function PillsStepTwo(props: Props) {
  const { navigation } = props;
  const { medsRegularity } = props.route.params;

  const notifications: Reminder[] = [];
  const openedPicker = [];

  for (let i = 0; i < medsRegularity; i++) {
    const remind = {
      reminder: new Date(),
      id: `${i}`,
    };
    notifications.push(remind);

    openedPicker.push(false);
  }

  const [date, setDate] = useState(notifications);
  const [open, setOpen] = useState(openedPicker);

  const { goBack } = navigation;

  const changeDatePickerVisibility = (id: number) => {
    const temp = open.slice();
    temp[id] = !temp[id];

    setOpen(temp);
  };

  const changeNotificationsDate = (newDate: Date, id: number) => {
    const temp = [];
    date.forEach((item) => {
      temp.push(JSON.parse(JSON.stringify(item)));
    });
    temp[id].reminder = newDate;
    setDate(temp);
  };

  const renderItem = ({ item }: Reminder) => {
    return (
      <TouchableOpacity style={styles.reminder} onPress={() => changeDatePickerVisibility(item.id)}>
        <Text>{Number(item.id) + 1} прием</Text>
        <Text>{`${item.reminder.getHours()}` + ':' + `${item.reminder.getMinutes()}` + '▼'}</Text>
        <DatePicker
          modal
          open={open[item.id]}
          mode="time"
          is24hourSource="device"
          date={item.reminder}
          onConfirm={(date) => {
            changeDatePickerVisibility(item.id);
            changeNotificationsDate(date, item.id);
          }}
          onCancel={() => {
            changeDatePickerVisibility(item.id);
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      <Button title="back" onPress={() => goBack()} />
      <FlatList data={notifications} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
});

export default PillsStepTwo;
