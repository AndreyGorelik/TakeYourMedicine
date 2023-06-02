import { useNavigation, useTheme } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsButton = () => {
  const navigation = useNavigation();
  const { dark } = useTheme();

  return (
    <View style={styles.view}>
      <Icon
        name="gear"
        size={24}
        color={dark ? 'gray' : 'black'}
        onPress={() => navigation.navigate('Settings' as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
  },
});

export default SettingsButton;
