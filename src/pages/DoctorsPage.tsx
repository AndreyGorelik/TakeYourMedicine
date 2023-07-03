import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { FlatList, StyleSheet, View } from 'react-native';

import DoctorCard from 'components/DoctorCard';
import FloatingButton from 'components/FloatingButton';

import { useAppSelector } from '../hooks/redux-hooks';

import { DoctorVisit } from './DoctorAppointment';

type DoctorsPageProps = {
  navigation: NavigationProp<ParamListBase>;
};

function DoctorsPage({ navigation }: DoctorsPageProps) {
  const tabBarHeight = useBottomTabBarHeight();
  const { doctorVisits } = useAppSelector((state) => state.doctorsSlice);

  const renderDoctorCard = ({ item }: { item: DoctorVisit }) => {
    return (
      <View>
        <DoctorCard visitInfo={item} />
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
        contentContainerStyle={{ paddingBottom: tabBarHeight * 1.5 }}
      />
      <FloatingButton onPress={() => navigation.navigate('DoctorAppointment')} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignContent: 'center',
  },
  flatList: {
    flex: 1,
  },
});

export default DoctorsPage;
