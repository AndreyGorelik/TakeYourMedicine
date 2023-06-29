import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DoctorVisit } from 'pages/DoctorAppointment';

import useTheme from '../hooks/useTheme';
import convertTime from '../utils/convertTime';

import IconButton from './IconButton';
import Text from './Text';

const CARD_ICON_SIZE = 18;
const ACTION_BUTTON_ICON_SIZE = 24;

function DoctorCard({ visitInfo }: { visitInfo: DoctorVisit }) {
  const { themeStyle } = useTheme();
  const navigation = useNavigation();
  const makePhoneCall = () => {
    Linking.openURL(`tel:${visitInfo.phone}`);
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${visitInfo.email}`);
  };

  const navigateToEdit = () => {
    navigation.navigate('DoctorAppointment', { visitInfo });
  };

  return (
    <TouchableOpacity
      style={[{ backgroundColor: themeStyle.colors.back }, styles.container]}
      onPress={navigateToEdit}
      activeOpacity={0.6}
    >
      <Text variant="h3">{visitInfo.name}</Text>
      <Text>{visitInfo.specialization}</Text>
      <View style={styles.row}>
        <View style={styles.marginRight}>
          <View style={styles.row}>
            <Fontisto name="date" color={themeStyle.colors.text} size={CARD_ICON_SIZE} />
            <Text variant="medium">Date</Text>
          </View>
          <Text variant="h5">{visitInfo.appointmentDate}</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Ionicons name="time-outline" color={themeStyle.colors.text} size={CARD_ICON_SIZE} />
            <Text variant="medium">Time</Text>
          </View>
          <Text variant="h5">{convertTime(visitInfo.appointmentTime)}</Text>
        </View>
      </View>
      <View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="office-building-marker-outline"
            color={themeStyle.colors.text}
            size={CARD_ICON_SIZE}
          />
          <Text variant="medium">Address</Text>
        </View>
        <Text variant="h5">{visitInfo.address}</Text>
      </View>
      <View style={styles.rowRight}>
        <IconButton onPress={makePhoneCall}>
          <Feather name="phone" color={themeStyle.colors.buttons} size={ACTION_BUTTON_ICON_SIZE} />
        </IconButton>
        <IconButton onPress={sendEmail}>
          <Fontisto name="email" color={themeStyle.colors.buttons} size={ACTION_BUTTON_ICON_SIZE} />
        </IconButton>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  marginRight: {
    marginRight: 40,
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
});

export default DoctorCard;
