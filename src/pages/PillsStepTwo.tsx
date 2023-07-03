import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, BackHandler, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from 'components/Button';
import ModalWithInput from 'components/ModalWithInput';
import Text from 'components/Text';

import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';
import checkPermissions from '../utils/checkPermissions';
import convertTime from '../utils/convertTime';

import { TimeInterface } from './EditPills';

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

  useMount(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  });

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
    checkPermissions().then((status) => {
      if (status) {
        setSupplyNotification(!supplyNotification);
      } else {
        setSupplyNotification(false);
      }
    });
  };

  const toggleTakingMedsNotifications = () => {
    checkPermissions().then((data) => {
      if (data) {
        setNotificationsOnOff(!notificationsOnOff);
      } else {
        setNotificationsOnOff(false);
      }
    });
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

  const renderItem = (item: TimeInterface, index: number) => {
    const isOpen = openIndex === index;
    const isLastElement = notificationTime.length === 1;
    return (
      <View style={styles.time} key={item.id}>
        {medsRegularity > 3 && (
          <TouchableOpacity
            onPress={() => deleteTime(item.id)}
            style={styles.reminder}
            disabled={isLastElement}
          >
            <Ionicons
              name="ios-remove-circle-outline"
              size={24}
              color={isLastElement ? 'gray' : 'red'}
            />
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
    <View style={styles.view}>
      <ScrollView style={[{ backgroundColor: themeStyle.colors.back }, styles.top]}>
        <View>
          <View style={styles.switchContainer}>
            <Text>Напоминания о приеме</Text>
            <Switch value={notificationsOnOff} onValueChange={toggleTakingMedsNotifications} />
          </View>

          <View>{notificationTime.map(renderItem)}</View>

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
      </ScrollView>
      <View style={[{ backgroundColor: themeStyle.colors.back }, styles.navigationButtons]}>
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
  },
  top: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 25,
  },
});

export default PillsStepTwo;
