import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';
import ModalWithInput from 'components/ModalWithInput';
import PhotoWithModal from 'components/PhotoWithModal';
import Text from 'components/Text';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import { WrapperStackParamList } from '../navigation/AppWrapper';
import { deleteScheduleItems, updateScheduleItem } from '../store/slices/medsScheduleSlice';
import cancelNotification from '../utils/cancelNotification';
import checkPermissions from '../utils/checkPermissions';
import convertTime from '../utils/convertTime';
import notifyOnTimeSchedule from '../utils/notifyOnTimeSchedule';

import { medsInfo } from './TreatmentPage';

export interface TimeInterface {
  id: string;
  time: string;
}
type Props = StackScreenProps<WrapperStackParamList, 'EditPills'>;

function EditPills(props: Props) {
  const { navigation, route } = props;
  const id = route.params.id;
  const dispatch = useAppDispatch();
  const { themeStyle } = useTheme();
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  useMount(() => {
    navigation.setOptions({
      headerRight: () => <DeleteButton deleteItem={() => deleteMeds(id)} />,
    });
  });

  const itemToRender: medsInfo = useAppSelector((state) =>
    state.medsScheduleReducer.schedule.find((item: medsInfo) => item.id === id)
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: itemToRender,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'notificationTime',
  });

  const onSubmit = (data: medsInfo) => {
    if (data.notificationsOnOff) {
      itemToRender.notificationTime.forEach((item) => {
        cancelNotification(item.id);
      });
      data.notificationTime.forEach((item) => {
        notifyOnTimeSchedule(item, data);
      });
    } else {
      data.notificationTime.forEach((item) => {
        cancelNotification(item.id);
      });
    }

    dispatch(updateScheduleItem(data));
    navigation.navigate('TreatmentPage');
  };

  if (!itemToRender) return null;

  const supplyNotifications = watch('supplyNotification');

  const deleteMeds = (id: string) => {
    navigation.navigate('TreatmentPage');
    itemToRender.notificationTime.forEach((item) => {
      cancelNotification(item.id);
    });
    dispatch(deleteScheduleItems(id));
  };

  const closeDatePicker = () => {
    setOpenIndex(null);
  };

  const openDatePicker = (index: number) => {
    setOpenIndex(index);
  };

  const switchNotification = (newValue: boolean, onChange: (event: boolean) => void) => {
    checkPermissions().then((status) => {
      if (status) {
        onChange(newValue);
      } else {
        onChange(false);
      }
    });
  };

  const switchSupplyNotification = (newValue: boolean, onChange: (event: boolean) => void) => {
    checkPermissions().then((status) => {
      if (status) {
        onChange(newValue);
      } else {
        onChange(false);
      }
    });
  };

  const isValidMedsSupply = (count: string) => {
    const medsRest = watch('medsRest');
    if (+count < +medsRest && supplyNotifications) return false;

    return true;
  };

  return (
    <ScrollView style={[styles.top, { backgroundColor: themeStyle.colors.back }]}>
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
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.switchContainer}>
              <Text>Напоминать о приеме</Text>
              <Switch
                value={value}
                onValueChange={(newValue) => switchNotification(newValue, onChange)}
              />
            </View>
          )}
          name="notificationsOnOff"
        />

        {fields.map((item, index) => {
          return (
            <View style={styles.time} key={item.id}>
              <TouchableOpacity onPress={() => remove(index)} style={styles.switchContainer}>
                <Ionicons name="ios-remove-circle-outline" size={24} />
              </TouchableOpacity>

              <Controller
                render={({ field }) => {
                  return (
                    <View style={styles.timePicker}>
                      <TouchableOpacity
                        onPress={() => openDatePicker(index)}
                        style={styles.switchContainer}
                      >
                        <Text>{Number(index + 1).toString() + ' прием'}</Text>
                        <Text>{convertTime(item.time) + '▼'}</Text>
                      </TouchableOpacity>
                      {openIndex === index && (
                        <DatePicker
                          modal
                          open={true}
                          mode="time"
                          date={new Date(field.value)}
                          onConfirm={(newDate) => {
                            closeDatePicker();
                            update(index, {
                              time: newDate.toString(),
                              id: item.id,
                            });
                          }}
                          onCancel={closeDatePicker}
                        />
                      )}
                    </View>
                  );
                }}
                name={`notificationTime.${index}.time`}
                control={control}
              />
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.addNotification}
          onPress={() => {
            append({ time: new Date().toString(), id: uuid.v4().toString() });
          }}
        >
          <Ionicons name="ios-add-circle-outline" size={24} color={'green'} />
          <Text>Добавить напоминание</Text>
        </TouchableOpacity>

        <Text variant="h3">Запасы</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.switchContainer}>
              <Text>Напоминать об остатке</Text>
              <Switch
                value={value}
                onValueChange={(newValue) => switchSupplyNotification(newValue, onChange)}
              />
            </View>
          )}
          name="supplyNotification"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 5,
            minLength: 1,
            required: true,
            validate: isValidMedsSupply,
          }}
          render={({ field: { onChange, value } }) => (
            <ModalWithInput
              label="Запас"
              value={value}
              onChangeText={onChange}
              disabled={!supplyNotifications}
            />
          )}
          name="medsSupply"
        />
        {errors.medsSupply && <Text variant="warning">This is weird.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            minLength: 1,
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <ModalWithInput
              disabled={!supplyNotifications}
              label="Уведомлять при"
              value={value.toString()}
              onChangeText={onChange}
            />
          )}
          name="medsRest"
        />
        {errors.medsRest && <Text variant="warning">This is required.</Text>}
      </View>
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
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
    gap: 10,
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
  navigationButtons: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
});

export default EditPills;
