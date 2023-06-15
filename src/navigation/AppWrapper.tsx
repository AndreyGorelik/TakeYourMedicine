import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

import EditPills from 'pages/EditPills';
import SettingsPage from 'pages/Settings';
import { medsInfo } from 'pages/TreatmentPage';

import { useAppSelector } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import cancelNotification from '../utils/cancelNotification';
import notifyOnTime from '../utils/scheduleNotification';
import notifyOnTimer from '../utils/timerNotification';

import AddPills from './AddPills';
import BottomTabsScreen from './BottomTabs';
const Stack = createStackNavigator();

function AppWrapper() {
  const theme = useTheme();
  const medsScheduleReducer = useAppSelector((state) => state.medsScheduleReducer);
  const updateNotificationsStatus = () => {
    medsScheduleReducer.schedule.forEach((meds: medsInfo) => {
      if (meds.notificationsOnOff === true) {
        meds.notificationTime.forEach((item) => {
          cancelNotification(item.id);
          notifyOnTime(item, meds);
        });
      } else {
        meds.notificationTime.forEach((item) => {
          cancelNotification(item.id);
        });
      }
    });
  };

  updateNotificationsStatus();

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (pressAction?.id === 'openApp') {
      await notifee.cancelNotification(notification!.id!);
    }
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsLater') {
      notifyOnTimer();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={theme.themeStyle}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Home" component={BottomTabsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddPills" component={AddPills} options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            children={() => <SettingsPage changeTheme={theme.changeTheme} />}
          />
          <Stack.Screen
            name="EditPills"
            component={EditPills}
            options={{
              title: 'Edit',
              headerStyle: {
                height: 60,
              },
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 28,
                paddingVertical: 10,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppWrapper;
