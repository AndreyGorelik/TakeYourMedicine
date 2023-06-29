import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';

import Button from 'components/Button';
import CameraGallery from 'components/CameraGallery';
import Text from 'components/Text';

import { noPhoto } from '../assets/images';
import { useAppDispatch } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';
import { addNewPillsToSchedule } from '../store/slices/medsScheduleSlice';
import notifyOnTimeSchedule from '../utils/notifyOnTimeSchedule';

import { medsInfo } from './TreatmentPage';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepThree'>;

function PillsStepThree(props: Props) {
  const { themeStyle } = useTheme();
  const { navigation } = props;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { range, ...medsInfoForSaving } = props.route.params;
  const dispatch = useAppDispatch();

  const [photo, setPhoto] = useState(noPhoto);

  const saveMedsToSchedule = () => {
    const scheduleItem: medsInfo = {
      ...medsInfoForSaving,
      photo: photo,
      id: uuid.v4().toString(),
    };

    dispatch(addNewPillsToSchedule(scheduleItem));

    if (scheduleItem.notificationsOnOff) {
      scheduleItem.notificationTime.forEach((item) => {
        notifyOnTimeSchedule(item, scheduleItem);
      });
    }
    navigation.navigate('Home' as never);
  };

  return (
    <View style={[{ backgroundColor: themeStyle.colors.back }, styles.view]}>
      <Text variant="h3">Add photo</Text>
      <CameraGallery photo={photo} setPhoto={setPhoto} />
      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => navigation.navigate('AddMedsStepTwo', medsInfoForSaving)}
        />
        <Button title="Save" disabled={false} onPress={saveMedsToSchedule} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    gap: 10,
  },
});

export default PillsStepThree;
