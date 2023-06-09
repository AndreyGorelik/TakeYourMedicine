import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { medsInfo } from 'pages/TreatmentPage';

import Text from './Text';

const MedsCard = ({ data }: { data: medsInfo }) => {
  const navigation = useNavigation();

  const navigateToEdit = () => {
    navigation.navigate('EditPills', { id: data.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToEdit}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="pill" size={24} color={'red'} />
        <Text variant="h4">{data.medsName}</Text>
      </View>
      <Text>{data.medsRegularity.toString() + ' в день'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MedsCard;
