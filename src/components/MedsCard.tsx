import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

import { medsInfo } from 'pages/TreatmentPage';

import useTheme from '../hooks/useTheme';
import convertTime from '../utils/convertTime';

import Text from './Text';

interface MedsCardProps {
  data: medsInfo;
  navigation: any;
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}
const MedsCard = ({ data, navigation, selectedList, setSelectedList }: MedsCardProps) => {
  const { themeStyle } = useTheme();

  const navigateToEdit = () => {
    navigation.navigate('EditPills', { id: data.id });
  };

  const selectItem = (id: string) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item: string) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  return (
    <TouchableOpacity
      style={[{ backgroundColor: themeStyle.colors.back }, styles.container]}
      onPress={navigateToEdit}
      onLongPress={() => selectItem(data.id)}
      activeOpacity={0.6}
    >
      <View style={styles.header}>
        <View style={styles.leftColumn}>
          <Text variant="h3">{data.medsName}</Text>
          {data.medsDescription ? <Text>{data.medsDescription}</Text> : null}
          <Text variant="h6">{data.notificationTime.length.toString() + ' в день'}</Text>
        </View>
        <View>
          <Image
            style={styles.medsImage}
            source={{
              uri: data.photo,
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.reminderHeader}>
          <Entypo name="bell" size={18} color={themeStyle.colors.primary} />
          <Text variant="h5">Reminders</Text>
        </View>
        <View style={styles.reminderText}>
          {data.notificationTime.map((item, index, array) => {
            const isLastElement = index === array.length - 1;
            return (
              <View key={item.id}>
                <Text>{isLastElement ? convertTime(item.time) : convertTime(item.time) + ','}</Text>
              </View>
            );
          })}
        </View>
      </View>
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
    justifyContent: 'space-between',
  },
  medsImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  leftColumn: {
    flexDirection: 'column',
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reminderText: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default MedsCard;
