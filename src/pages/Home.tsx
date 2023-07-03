import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Alert, ScrollView, Linking, TextInput } from 'react-native';

import Button from 'components/Button';

function HomePage() {
  const [test, setTest] = useState('');
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

  const check = async () => {
    await notifee.requestPermission();
  };

  return (
    <ScrollView style={styles.view}>
      <Button title="clear redux storage" onPress={clear} />
      <Button title="show notifications id" onPress={show} />
      <Button title="check" onPress={check} />
      <Button title="deleete notifications" onPress={del} />
      <Button title="deep link" onPress={() => Linking.openURL('demoapp://Settings')} />
      <TextInput value={test} onChangeText={setTest} style={styles.input} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
    gap: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomePage;
