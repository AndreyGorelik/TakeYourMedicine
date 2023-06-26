import { useNavigation, useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsButton = () => {
  const navigation = useNavigation();
  const { dark } = useTheme();

  return (
    <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('Settings' as never)}>
      <Icon name="gear" size={24} color={dark ? 'gray' : 'black'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
  },
});

export default SettingsButton;
