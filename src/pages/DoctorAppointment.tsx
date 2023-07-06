import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, ScrollView, View, Modal, Switch } from 'react-native';
import { CalendarUtils } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';

import Button from 'components/Button';
import CalendarWithSelectableDate from 'components/CalendarWithSelectableDate';
import Text from 'components/Text';
import TextInput from 'components/TextInput';

import { useAppDispatch } from '../hooks/redux-hooks';
import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import { WrapperStackParamList } from '../navigation/AppWrapper';
import { saveNewAppointment, saveEditedAppointment } from '../store/slices/doctorsSlice';
import cancelNotification from '../utils/cancelNotification';
import checkPermissions from '../utils/checkPermissions';
import convertTime from '../utils/convertTime';
import notifyOnTime from '../utils/notifyOnTime';

export interface DoctorVisit {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  address: string;
  appointmentTime: string;
  appointmentDate: string;
  notificationTime: string;
  notificationStatus: boolean;
  notificationTimeAndDate?: string;
}

type Props = StackScreenProps<WrapperStackParamList, 'DoctorAppointment'>;

function DoctorAppointment({ navigation, route }: Props) {
  const { themeStyle } = useTheme();
  const visitInfo = route.params?.visitInfo;

  useMount(() => {
    if (visitInfo) navigation.setOptions({ title: 'Edit appointment' });
  });

  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const [reminderTimePickerVisibility, setReminderTimePickerVisibility] = useState(false);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const dispatch = useAppDispatch();

  const defaultFormValues = visitInfo || {
    name: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    appointmentTime: new Date().toString(),
    appointmentDate: CalendarUtils.getCalendarDateString(new Date()),
    notificationTime: new Date(new Date().getTime() - 1000 * 60 * 60).toString(),
    notificationStatus: false,
    id: uuid.v4().toString(),
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const isValidEmail = (email: string) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNotificationTime = (nTime: string) => {
    const watchAppointmentTime = watch('appointmentTime');
    if (new Date(nTime) > new Date(watchAppointmentTime)) {
      return false;
    }
    return true;
  };

  const openTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const closeTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const openReminderTimePicker = () => {
    setReminderTimePickerVisibility(true);
  };

  const closeReminderTimePicker = () => {
    setReminderTimePickerVisibility(false);
  };

  const openDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const closeDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const switchNotification = (newValue: boolean, onChange: any) => {
    checkPermissions().then((status) => {
      if (status) {
        onChange(newValue);
      } else {
        onChange(false);
      }
    });
  };

  const onSubmit: SubmitHandler<DoctorVisit> = (data) => {
    const notificationTimeAndDate = new Date(data.appointmentDate);
    notificationTimeAndDate.setHours(new Date(data.notificationTime).getHours());
    notificationTimeAndDate.setMinutes(new Date(data.notificationTime).getMinutes());

    if (visitInfo) {
      dispatch(
        saveEditedAppointment({
          ...data,
          notificationTimeAndDate: notificationTimeAndDate.toString(),
        })
      );
    } else {
      dispatch(
        saveNewAppointment({ ...data, notificationTimeAndDate: notificationTimeAndDate.toString() })
      );
    }

    if (data.notificationStatus) {
      notifyOnTime({ ...data, notificationTimeAndDate: notificationTimeAndDate.toString() });
    } else {
      cancelNotification(data.id);
    }

    navigation.navigate('DoctorsPage');
  };

  return (
    <View style={styles.view}>
      <ScrollView style={[{ backgroundColor: themeStyle.colors.back }, styles.scrollview]}>
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="Name" onChangeText={onChange} value={value} />
            )}
            name="name"
          />
          {errors.name && <Text variant="warning">This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="Specialization" onChangeText={onChange} value={value} />
            )}
            name="specialization"
          />
          {errors.specialization && <Text variant="warning">This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="Address" onChangeText={onChange} value={value} />
            )}
            name="address"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Phone"
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            )}
            name="phone"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 50,
              validate: isValidEmail,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="E-mail" onChangeText={onChange} value={value} />
            )}
            name="email"
          />
          {errors.email && <Text variant="warning">Incorrect e-mail</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity style={styles.reminder} onPress={openTimePicker}>
                <Text>Appointment time</Text>
                <Text>{convertTime(new Date(value)) + '▼'}</Text>
                {timePickerVisibility && (
                  <DatePicker
                    modal
                    open={true}
                    mode="time"
                    date={new Date(value)}
                    onConfirm={(date) => {
                      onChange(date.toString());
                      closeTimePicker();
                    }}
                    onCancel={closeTimePicker}
                  />
                )}
              </TouchableOpacity>
            )}
            name="appointmentTime"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity style={styles.reminder} onPress={openDatePicker}>
                  <Text>Date</Text>
                  <Text>{value + '▼'}</Text>
                </TouchableOpacity>

                <View>
                  <Modal
                    transparent={true}
                    visible={datePickerVisibility}
                    onRequestClose={closeDatePicker}
                  >
                    <TouchableOpacity style={styles.modalContainer} onPress={closeDatePicker}>
                      <TouchableOpacity style={styles.modal} activeOpacity={1}>
                        <CalendarWithSelectableDate
                          date={value}
                          setDate={(date) => {
                            onChange(date as string);
                            closeDatePicker();
                          }}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </Modal>
                </View>
              </>
            )}
            name="appointmentDate"
          />

          <Text variant="h3">Set notificiation</Text>

          <Controller
            control={control}
            rules={{
              validate: isValidNotificationTime,
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity style={styles.reminder} onPress={openReminderTimePicker}>
                <Text>Notification time</Text>
                <Text>{convertTime(new Date(value)) + '▼'}</Text>
                {reminderTimePickerVisibility && (
                  <DatePicker
                    modal
                    open={true}
                    mode="time"
                    date={new Date(value)}
                    onConfirm={(date) => {
                      onChange(date.toString());
                      closeReminderTimePicker();
                    }}
                    onCancel={closeReminderTimePicker}
                  />
                )}
              </TouchableOpacity>
            )}
            name="notificationTime"
          />
          {errors.notificationTime && (
            <Text variant="warning">Notification time should be before visit time.</Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.switchContainer}>
                <Text>Notification</Text>
                <Switch
                  value={value}
                  onValueChange={(newValue) => switchNotification(newValue, onChange)}
                />
              </View>
            )}
            name="notificationStatus"
          />
        </View>
      </ScrollView>
      <View style={[{ backgroundColor: themeStyle.colors.back }, styles.saveArea]}>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  view: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    gap: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  reminder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '90%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  saveArea: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
});

export default DoctorAppointment;
