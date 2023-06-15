import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { medsInfo } from 'pages/TreatmentPage';

import useTheme from '../hooks/useTheme';

import Text from './Text';

const MedsCard = ({ data }: { data: medsInfo }) => {
  const navigation = useNavigation();

  const { themeStyle } = useTheme();

  const navigateToEdit = () => {
    navigation.navigate('EditPills', { id: data.id });
  };

  return (
    <TouchableOpacity
      style={[{ backgroundColor: themeStyle.colors.back }, styles.container]}
      onPress={navigateToEdit}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="pill" size={24} color={'red'} />
        <Text variant="h3">{data.medsName}</Text>
      </View>
      <Text>{data.medsRegularity.toString() + ' в день'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MedsCard;
