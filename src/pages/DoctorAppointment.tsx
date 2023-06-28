import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, ScrollView, View, Modal, Switch } from 'react-native';
import { CalendarUtils } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';

import Button from 'components/Button';
import CalendarWithSelectableDate from 'components/CalendarWithSelectableDate';
import Text from 'components/Text';
import TextInput from 'components/TextInput';

import { useAppDispatch } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import { saveAppointment } from '../store/slices/doctorsSlice';
import convertTime from '../utils/convertTime';

export interface DoctorVisit {
  name: string;
  specialization: string;
  email: string;
  phone: string;
  address: string;
  appointmentTime: string;
  appointmentDate: string;
  id: string;
}

function DoctorAppointment({ navigation }) {
  const { themeStyle } = useTheme();

  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const [reminderTimePickerVisibility, setReminderTimePickerVisibility] = useState(false);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      specialization: '',
      email: '',
      phone: '',
      address: '',
      appointmentTime: new Date().toString(),
      appointmentDate: CalendarUtils.getCalendarDateString(new Date()),
      notificationTime: new Date(new Date().getTime() - 1000 * 60 * 60).toString(),
      notificationStatus: true,
      id: uuid.v4().toString(),
    },
  });

  const isValidEmail = (email: string) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  // const chooseDate = (date: string) => {
  //   setAppointmentDate(date);
  //   setDatePickerVisibility(false);
  // };

  // const saveData = () => {
  //   const appointmentTimeAndDate = new Date(appointmentDate);
  //   appointmentTimeAndDate.setHours(appointmentTime.getHours());
  //   appointmentTimeAndDate.setMinutes(appointmentTime.getMinutes());

  //   const doctorVisit: DoctorVisit = {
  //     address,
  //     appointmentTimeAndDate: appointmentTimeAndDate.toString(),
  //     email,
  //     name,
  //     phone,
  //     specialization,
  //     id: uuid.v4().toString(),
  //   };

  //   dispatch(saveAppointment(doctorVisit));
  //   navigation.navigate('DoctorsPage');
  // };

  const onSubmit = (data: DoctorVisit) => {
    console.log(data);

    // dispatch(saveAppointment(doctorVisit));
    // navigation.navigate('DoctorsPage');
  };

  return (
    <ScrollView style={[{ backgroundColor: themeStyle.colors.back }, styles.view]}>
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
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Phone" onChangeText={onChange} value={value} />
        )}
        name="phone"
      />

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
                        onChange(date);
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
                onCancel={closeTimePicker}
              />
            )}
          </TouchableOpacity>
        )}
        name="notificationTime"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Notification</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
        name="notificationStatus"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
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
});

export default DoctorAppointment;
