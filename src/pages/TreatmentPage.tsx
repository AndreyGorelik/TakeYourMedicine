import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import FloatingButton from 'components/FloatingButton';
import MedsCard from 'components/MedsCard';
import Text from 'components/Text';

import ActionSheet, { BottomSheetRefProps, ACTION_SHEET_SIZE } from '../components/ActionSheet';
import { useAppSelector } from '../hooks/redux-hooks';

interface NotificationTime {
  id: string;
  time: string;
}

export interface medsInfo {
  medsName: string;
  medsRegularity: number;
  notificationTime: NotificationTime[];
  notificationsOnOff: boolean;
  id: string;
}

function TreatmentPage() {
  const ref = useRef<BottomSheetRefProps>(null);
  const navigation = useNavigation();

  const { schedule } = useAppSelector((state) => state.medsScheduleReducer);

  const options = [{ label: 'Add pills', function: sayHi, id: '1' }];

  const showActionSheet = () => {
    const isActive = ref?.current?.isActive;
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(ACTION_SHEET_SIZE);
    }
  };

  function sayHi() {
    navigation.navigate('AddPills' as never);
  }

  const renderMedsCard = ({ item }: { item: medsInfo }) => {
    return <MedsCard data={item} />;
  };

  return (
    <View style={styles.view}>
      <ActionSheet ref={ref} options={options} />
      {schedule.length === 0 ? <Text>Пока ничего нет</Text> : null}
      <FloatingButton onPress={showActionSheet} />
      <FlatList
        data={schedule}
        renderItem={renderMedsCard}
        keyExtractor={(item: medsInfo) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
  flatList: {
    zIndex: -1,
  },
});

export default TreatmentPage;
