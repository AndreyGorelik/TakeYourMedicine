import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList, StyleSheet, View } from 'react-native';

import DoctorCard from 'components/DoctorCard';
import FloatingButton from 'components/FloatingButton';
import Text from 'components/Text';

import { useAppSelector } from '../hooks/redux-hooks';

import { DoctorVisit } from './DoctorAppointment';

function DoctorsPage({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const { doctorVisits } = useAppSelector((state) => state.doctorsSlice);
  // console.log(doctorVisits);

  const renderDoctorCard = ({ item }: { item: DoctorVisit }) => {
    return (
      <View>
        <DoctorCard data={item} />
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={doctorVisits}
        renderItem={renderDoctorCard}
        keyExtractor={(item: DoctorVisit) => item.id}
        style={styles.flatList}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      />
      <FloatingButton onPress={() => navigation.navigate('DoctorAppointment')} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  flatList: {
    flex: 1,
  },
});

export default DoctorsPage;
