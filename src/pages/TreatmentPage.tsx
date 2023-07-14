import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import Checkbox from 'components/Checkbox';
import DeleteButton from 'components/DeleteButton';
import FloatingButton from 'components/FloatingButton';
import MedsCard from 'components/MedsCard';
import SettingsButton from 'components/SettingsButton';
import Text from 'components/Text';

import ActionSheet, { BottomSheetRefProps, ACTION_SHEET_SIZE } from '../components/ActionSheet';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { BottomTabBarParamList } from '../navigation/BottomTabs';
import { deleteScheduleItems } from '../store/slices/medsScheduleSlice';

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

type Props = StackScreenProps<BottomTabBarParamList, 'TreatmentPage'>;

function TreatmentPage(props: any) {
  const ref = useRef<BottomSheetRefProps>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const { schedule } = useAppSelector((state) => state.medsScheduleReducer);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { navigation, route } = props;
  const id = route.params?.id;
  const openFromPushStatus = route.params?.openFromPushStatus;

  useEffect(() => {
    if (id && openFromPushStatus) {
      navigation.navigate('EditPills', { id, openFromPushStatus });
    }
  }, [id, navigation, openFromPushStatus]);

  const deleteItems = useCallback(() => {
    dispatch(deleteScheduleItems(selectedList));
    setSelectedList([]);
  }, [dispatch, selectedList]);

  useEffect(() => {
    if (selectedList.length > 0) {
      navigation.setOptions({
        headerRight: () => <DeleteButton deleteItem={deleteItems} />,
      });
    } else {
      navigation.setOptions({ headerRight: () => <SettingsButton /> });
    }
  }, [deleteItems, navigation, selectedList]);

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

  const selectItem = (id: string) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item: string) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const options = [{ label: 'Add pills', function: sayHi, id: '1' }];

  const renderMedsCard = ({ item }: { item: medsInfo }) => {
    return (
      <View style={styles.cardContainer}>
        {selectedList.length > 0 ? (
          <View style={styles.cardContainerCheckbox}>
            {selectedList.includes(item.id) ? (
              <TouchableOpacity onPress={() => selectItem(item.id)}>
                <Checkbox checked={true} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => selectItem(item.id)}>
                <Checkbox checked={false} />
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        <View style={styles.cardContainerMedsCard}>
          <MedsCard
            data={item}
            navigation={navigation}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <ActionSheet ref={ref} options={options} />
      {schedule.length === 0 ? <Text>Пока ничего нет</Text> : null}

      <FlatList
        data={schedule}
        renderItem={renderMedsCard}
        keyExtractor={(item: medsInfo) => item.id}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      />
      <FloatingButton onPress={showActionSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainerCheckbox: {
    alignSelf: 'center',
    marginRight: 10,
  },
  cardContainerMedsCard: {
    flex: 1,
  },
});

export default TreatmentPage;
