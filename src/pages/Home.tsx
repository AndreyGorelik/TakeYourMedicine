import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Alert, Button, ScrollView, Linking } from 'react-native';

function HomePage() {
  const clear = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => Alert.alert('storage cleared'));
  };

  const show = () => {
    notifee
      .getTriggerNotificationIds()
      // eslint-disable-next-line no-console
      .then((ids) => console.log('All trigger notifications: ', ids));
  };

  const del = () => {
    notifee.cancelAllNotifications();
  };

  return (
    <ScrollView style={styles.view}>
      <Button title="clear redux storage" onPress={clear} />
      <Button title="show notifications id" onPress={show} />
      <Button title="deleete notifications" onPress={del} />
      <Button title="deep link" onPress={() => Linking.openURL('demoapp://Settings')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
});

export default HomePage;
