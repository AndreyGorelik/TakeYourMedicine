import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import EditPills from 'pages/EditPills';
import SettingsPage from 'pages/Settings';

import { useAppDispatch } from '../hooks/redux-hooks';
import useTheme from '../hooks/useTheme';
import { cancelAllNotifications } from '../store/slices/medsScheduleSlice';
import checkPermissions from '../utils/checkPermissions';
import notifyOnTimer from '../utils/timerNotification';

import AddPills from './AddPills';
import BottomTabsScreen from './BottomTabs';
const Stack = createStackNavigator();

function AppWrapper() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkPermissions().then((permissionStatus) => {
      if (!permissionStatus) {
        dispatch(cancelAllNotifications());
      }
    });
  }, [dispatch]);

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
