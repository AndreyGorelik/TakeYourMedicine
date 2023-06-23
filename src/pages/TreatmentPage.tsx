import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
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
  medsDescription: string;
  notificationTime: NotificationTime[];
  notificationsOnOff: boolean;
  id: string;
  photo: string;
  medsSupply: string;
  medsRest: number;
  supplyNotification: boolean;
}

function TreatmentPage({ navigation }: { navigation: any }) {
  const ref = useRef<BottomSheetRefProps>(null);
  const tabBarHeight = useBottomTabBarHeight();

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
    ref?.current?.scrollTo(0);
    navigation.navigate('AddPills');
  }

  const renderMedsCard = ({ item }: { item: medsInfo }) => {
    return <MedsCard data={item} navigation={navigation} />;
  };

  return (
    <View style={styles.view}>
      <ActionSheet ref={ref} options={options} />
      {schedule.length === 0 ? <Text>Пока ничего нет</Text> : null}

      <FlatList
        data={schedule}
        renderItem={renderMedsCard}
        keyExtractor={(item: medsInfo) => item.id}
        style={styles.flatList}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      />
      <FloatingButton onPress={showActionSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // paddingVertical: 10,
    paddingHorizontal: 25,
  },
  flatList: {
    zIndex: -1,
  },
});

export default TreatmentPage;
