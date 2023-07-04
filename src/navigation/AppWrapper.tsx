import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import DoctorAppointment from 'pages/DoctorAppointment';
import EditPills from 'pages/EditPills';
import SettingsPage from 'pages/Settings';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import { cancelAllNotifications, decrementMedsSupply } from '../store/slices/medsScheduleSlice';
import checkPermissions from '../utils/checkPermissions';
import notifyOnTimer from '../utils/timerNotification';

import AddPills from './AddPills';
import BottomTabsScreen from './BottomTabs';
import notifyInstant from '../utils/notifyInstant';

const Stack = createStackNavigator();

function AppWrapper() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.medsScheduleReducer);
  console.log('уведомлять при', +state.schedule[0].medsRest);
  console.log('сейчас осталось', +state.schedule[0].medsSupply);
  if (+state.schedule[0].medsSupply < +state.schedule[0].medsRest) {
    notifyInstant();
  }

  useMount(() => {
    checkPermissions().then((permissionStatus: boolean) => {
      if (!permissionStatus) {
        dispatch(cancelAllNotifications());
      }
    });

    const navigateToInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await Linking.openURL(initialUrl);
      }
    };
    navigateToInitialUrl();
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.PRESS) {
      Linking.openURL(`takeyourmeds://EditPills/${notification!.data!.medsId}`);
    }
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsLater') {
      notifyOnTimer();
    }
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsTaken') {
      dispatch(decrementMedsSupply(notification!.data!.medsId));
      // Linking.openURL(`takeyourmeds://EditPills/${notification!.data!.medsId}`);
    }
  });

  notifee.onForegroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.PRESS) {
      Linking.openURL(`takeyourmeds://EditPills/${notification!.data!.medsId}`);
    }
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsLater') {
      notifyOnTimer();
    }
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsTaken') {
      dispatch(decrementMedsSupply(notification!.data!.medsId));
      Linking.openURL(`takeyourmeds://EditPills/${notification!.data!.medsId}`);
    }
  });

  const linking = {
    prefixes: ['takeyourmeds://'],
    config: {
      screens: {
        EditPills: 'EditPills/:id',
      },
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={theme.themeStyle} linking={linking}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={styles.container}
        >
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={BottomTabsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="AddPills" component={AddPills} options={{ headerShown: false }} />
            <Stack.Screen
              name="DoctorAppointment"
              component={DoctorAppointment}
              options={{
                title: 'New appointment',
                headerStyle: {
                  height: 60,
                },
                headerTitleStyle: {
                  fontWeight: '600',
                  fontSize: 26,
                  paddingVertical: 10,
                },
              }}
            />
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
                  fontSize: 26,
                  paddingVertical: 10,
                },
              }}
            />
          </Stack.Navigator>
        </TouchableWithoutFeedback>
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
