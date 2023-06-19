import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from 'components/Button';
import Text from 'components/Text';

import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';
import convertTime from '../utils/Time';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

interface Time {
  id: string;
  time: string;
}

function PillsStepTwo(props: Props) {
  const { themeStyle } = useTheme();
  const { navigation } = props;
  const { medsName, medsRegularity, medsDosage } = props.route.params;

  const [notificationTime, setNotificationTime] = useState<Time[]>(
    Array.from({ length: medsRegularity }, () => ({
      id: uuid.v4().toString(),
      time: new Date().toString(),
    }))
  );

  useEffect(() => {
    setNotificationTime(
      Array.from({ length: medsRegularity }, () => ({
        id: uuid.v4().toString(),
        time: new Date().toString(),
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
          time: date.toString(),
        };
      } else {
        return item;
      }
    });
    setNotificationTime(newNoti);

    handleClose();
  };

  const toggleSwitch = () => {
    setNotificationsOnOff(!notificationsOnOff);
  };

  const handleAddNewTime = () => {
    setNotificationTime([
      ...notificationTime,
      {
        id: uuid.v4().toString(),
        time: new Date().toString(),
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

  const nextScreenProps = {
    medsName,
    medsRegularity,
    medsDosage,
    notificationTime,
    notificationsOnOff,
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
          <Text>{Number(index + 1) + ' прием'}</Text>
          {isOpen && (
            <DatePicker
              modal
              open={true}
              mode="time"
              date={new Date(item.time)}
              onConfirm={(date) => handleConfirm(date, item.id)}
              onCancel={handleClose}
            />
          )}
          <Text>{convertTime(item.time) + '▼'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[{ backgroundColor: themeStyle.colors.back }, styles.view]}>
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

      <View style={styles.navigationButtons}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button
          title="Next"
          onPress={() => navigation.navigate('AddMedsStepThree', nextScreenProps)}
        />
      </View>
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    gap: 10,
  },
});

export default PillsStepTwo;
