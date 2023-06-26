import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TouchableOpacity, View, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DeleteButton from 'components/DeleteButton';
import ModalWithInput from 'components/ModalWithInput';
import PhotoWithModal from 'components/PhotoWithModal';
import Text from 'components/Text';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import {
  changePillsInSchedule,
  switchNotifications,
  deleteNotificationTime,
  addNotificationTime,
  changeMedsSupply,
  changeMedsRest,
  switchSupplyNotifications,
  deleteSomeMeds,
} from '../store/slices/medsScheduleSlice';
import cancelNotification from '../utils/cancelNotification';
import checkPermissions from '../utils/checkPermissions';
import convertTime from '../utils/convertTime';
import notifyOnTime from '../utils/scheduleNotification';

import { medsInfo } from './TreatmentPage';

interface Time {
  id: string;
  time: string;
}

function EditPills(props: any) {
  const { id } = props.route.params;
  const dispatch = useAppDispatch();

  useMount(() => {
    props.navigation.setOptions({
      headerRight: () => <DeleteButton deleteItem={() => deleteMeds(id)} />,
    });
  });

  const { themeStyle } = useTheme();

  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const itemToRender: medsInfo = useAppSelector((state) =>
    state.medsScheduleReducer.schedule.find((item: medsInfo) => item.id === id)
  );

  if (!itemToRender) return null;

  if (itemToRender.notificationsOnOff) {
    itemToRender.notificationTime.forEach((item) => {
      notifyOnTime(item, itemToRender);
    });
  } else {
    itemToRender.notificationTime.forEach((item) => {
      cancelNotification(item.id);
    });
  }

  function deleteMeds(id: string) {
    props.navigation.navigate('TreatmentPage');
    itemToRender.notificationTime.forEach((item) => {
      cancelNotification(item.id);
    });
    dispatch(deleteSomeMeds(id));
  }

  const closeDatePicker = () => {
    setOpenIndex(null);
  };

  const confirmDate = (date: Date, dateId: string) => {
    const newDate = {
      newTime: date.toString(),
      dateId,
      medsId: id,
    };
    dispatch(changePillsInSchedule(newDate));

    if (itemToRender.notificationsOnOff) {
      notifyOnTime({ time: date.toString(), id: dateId }, itemToRender);
    }

    closeDatePicker();
  };

  const openDatePicker = (index: number) => {
    setOpenIndex(index);
  };

  const deleteTime = (notificationId: string) => {
    dispatch(deleteNotificationTime({ id, notificationId }));
  };

  const addNewTime = () => {
    dispatch(addNotificationTime(id));
  };

  const renderItem = ({ item, index }: { item: Time; index: number }) => {
    const date = new Date(item.time);
    const isOpen = openIndex === index;
    const isLastElement = itemToRender.notificationTime.length === 1;
    return (
      <View style={styles.time}>
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

  const changeMedsSupplyCount = (count: string) => {
    dispatch(changeMedsSupply({ count, id }));
  };

  const changeMedsRestCount = (count: string) => {
    dispatch(changeMedsRest({ count, id }));
  };

  const toggleSupplyNotifications = () => {
    if (Platform.OS === 'android') {
      checkPermissions().then((status) => {
        if (status) {
          dispatch(switchSupplyNotifications(id));
        }
      });
    }

    if (Platform.OS === 'ios') {
      dispatch(switchSupplyNotifications(id));
    }
  };

  const toggleTakingMedsNotifications = () => {
    if (Platform.OS === 'android') {
      checkPermissions().then((status) => {
        if (status) {
          dispatch(switchNotifications(id));
        }
      });
    }
    if (Platform.OS === 'ios') {
      dispatch(switchNotifications(id));
    }
  };

  return (
    <View style={[styles.view, { backgroundColor: themeStyle.colors.back }]}>
      <View style={styles.header}>
        <View>
          <Text variant="h3">{itemToRender.medsName}</Text>
          <Text>{itemToRender.medsDescription}</Text>
        </View>
        <View>
          <PhotoWithModal id={id} />
        </View>
      </View>
      <View>
        <Text variant="h3">Расписание приема</Text>
        <View style={styles.switchContainer}>
          <Text>Напоминать о приеме</Text>
          <Switch
            value={itemToRender.notificationsOnOff}
            onValueChange={toggleTakingMedsNotifications}
          />
        </View>
        <FlatList
          data={itemToRender.notificationTime}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.addNotification} onPress={addNewTime}>
          <Ionicons name="ios-add-circle-outline" size={24} color={'green'} />
          <Text>Добавить напоминание</Text>
        </TouchableOpacity>
        <Text variant="h3">Запасы</Text>
        <View style={styles.switchContainer}>
          <Text>Напоминать об остатке</Text>
          <Switch
            value={itemToRender.supplyNotification}
            onValueChange={toggleSupplyNotifications}
          />
        </View>
        <ModalWithInput
          label="Запас"
          value={itemToRender.medsSupply}
          onChangeText={changeMedsSupplyCount}
        />
        <ModalWithInput
          label="Уведомлять при остатке"
          value={itemToRender.medsRest.toString()}
          onChangeText={changeMedsRestCount}
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
    gap: 10,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default EditPills;
