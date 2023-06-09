import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Alert, Button } from 'react-native';

import Text from 'components/Text';

function HomePage() {
  const clear = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => Alert.alert('storage cleared'));
  };

  return (
    <View style={styles.view}>
      <Text>HELLO</Text>
      <Button title="clear redux storage" onPress={clear} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
});

export default HomePage;
