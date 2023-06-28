import {
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  Linking,
  View,
  TouchableOpacity,
} from 'react-native';

import { DoctorVisit } from 'pages/DoctorAppointment';

import useTheme from '../hooks/useTheme';

import Text from './Text';
function DoctorCard({ data }: { data: DoctorVisit }) {
  const { themeStyle } = useTheme();
  return (
    <TouchableOpacity
      style={[{ backgroundColor: themeStyle.colors.back }, styles.container]}
      onPress={() => console.log(1)}
      // onLongPress={() => selectItem(data.id)}
      activeOpacity={0.6}
    >
      <Text>{data.name}</Text>
      <Text>{data.specialization}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
});

export default DoctorCard;
