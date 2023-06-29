import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Switch, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from 'components/Button';
import ModalWithInput from 'components/ModalWithInput';
import Text from 'components/Text';

import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';
import checkPermissions from '../utils/checkPermissions';
import convertTime from '../utils/convertTime';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

interface Time {
  id: string;
  time: string;
}

function PillsStepTwo(props: Props) {
  const { themeStyle } = useTheme();
  const { navigation } = props;
  const { medsName, medsRegularity, medsDescription, medsSupply, medsForm } = props.route.params;

  const [notificationTime, setNotificationTime] = useState<Time[]>([]);
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const [notificationsOnOff, setNotificationsOnOff] = useState(false);
  const [supplyNotification, setSupplyNotification] = useState(false);
  const [medsRest, setMedsRest] = useState(10);

  useEffect(() => {
    const notificationTimers = Array.from({ length: medsRegularity }, () => ({
      id: uuid.v4().toString(),
      time: new Date().toString(),
    }));

    setNotificationTime(notificationTimers);
  }, [medsRegularity]);

  const openDatePicker = (index: number) => {
    setOpenIndex(index);
  };

  const closeDatePicker = () => {
    setOpenIndex(null);
  };

  const confirmTime = (date: Date, id: string) => {
    const newTime = notificationTime.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          time: date.toString(),
        };
      } else {
        return item;
      }
    });
    setNotificationTime(newTime);
    closeDatePicker();
  };

  const toggleSupplyNotifications = () => {
    if (Platform.OS === 'android') {
      checkPermissions().then((status) => {
        if (status) {
          setSupplyNotification(!supplyNotification);
        } else {
          setSupplyNotification(false);
        }
      });
    }

    setSupplyNotification(!supplyNotification);
  };

  const toggleTakingMedsNotifications = () => {
    if (Platform.OS === 'android') {
      checkPermissions().then((data) => {
        if (data) {
          setNotificationsOnOff(!notificationsOnOff);
        } else {
          setNotificationsOnOff(false);
        }
      });
    }

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

  const deleteTime = (id: string) => {
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
          <TouchableOpacity onPress={() => deleteTime(item.id)} style={styles.reminder}>
            <Ionicons name="ios-remove-circle-outline" size={24} color={'red'} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.reminder} onPress={() => openDatePicker(index)}>
          <Text>{Number(index + 1) + ' прием'}</Text>
          {isOpen && (
            <DatePicker
              modal
              open={true}
              mode="time"
              date={new Date(item.time)}
              onConfirm={(date) => confirmTime(date, item.id)}
              onCancel={closeDatePicker}
            />
          )}
          <Text>{convertTime(item.time) + '▼'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[{ backgroundColor: themeStyle.colors.back }, styles.view]}>
      <View>
        <View style={styles.switchContainer}>
          <Text>Напоминания о приеме</Text>
          <Switch value={notificationsOnOff} onValueChange={toggleTakingMedsNotifications} />
        </View>

        <View>
          <FlatList
            data={notificationTime}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>

        {medsRegularity > 3 && (
          <TouchableOpacity style={styles.addNotification} onPress={handleAddNewTime}>
            <Ionicons name="ios-add-circle-outline" size={24} color={'green'} />
            <Text>Добавить напоминание</Text>
          </TouchableOpacity>
        )}

        <View style={styles.switchContainer}>
          <Text>Напоминания об остатке</Text>
          <Switch value={supplyNotification} onValueChange={toggleSupplyNotifications} />
        </View>

        <ModalWithInput
          label="Остаток"
          value={medsRest > +medsSupply ? medsSupply.toString() : medsRest.toString()}
          onChangeText={setMedsRest}
        />
      </View>

      <View style={styles.navigationButtons}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button
          title="Next"
          onPress={() =>
            navigation.navigate('AddMedsStepThree', {
              medsName,
              medsRegularity,
              medsDescription,
              medsSupply,
              medsForm,
              notificationTime,
              notificationsOnOff,
              medsRest,
              supplyNotification,
            })
          }
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
  },
});

export default PillsStepTwo;
