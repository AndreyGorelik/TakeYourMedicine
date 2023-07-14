/**
 * @format
 */

import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry, Linking } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { store } from './src/store/index';
import { decrementMedsSupply } from './src/store/slices/medsScheduleSlice';
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS && notification?.data?.medsId) {
    Linking.openURL(
      'takeyourmeds://Home/TreatmentPage' +
        '?id=' +
        `${notification.data.medsId}` +
        '&openFromPushStatus=' +
        'true'
    );
  }

  if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsTaken') {
    const updateMedsDescription = async () => {
      const persistKey = 'persist:root';
      const persistedData = await AsyncStorage.getItem(persistKey);
      if (persistedData) {
        const persistedDataObject = JSON.parse(persistedData);
        const medsScheduleReducerObject = JSON.parse(persistedDataObject.medsScheduleReducer);
        const itemToEdit = medsScheduleReducerObject.schedule.find(
          (item) => item.id === notification.data.medsId
        );
        if (+itemToEdit.medsSupply === 0) {
          return;
        }
        itemToEdit.medsSupply = (+itemToEdit.medsSupply - 1).toString();
        persistedDataObject.medsScheduleReducer = JSON.stringify(medsScheduleReducerObject);
        const send = JSON.stringify(persistedDataObject);
        await AsyncStorage.setItem(persistKey, send);
      }
    };

    updateMedsDescription();
    store.dispatch(decrementMedsSupply(notification?.data?.medsId));
  }

  if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsLater') {
    Linking.openURL('takeyourmeds://Home/TreatmentPage');
  }
});

AppRegistry.registerComponent(appName, () => App);
