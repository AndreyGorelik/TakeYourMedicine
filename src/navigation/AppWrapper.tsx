import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import {
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import DoctorAppointment, { DoctorVisit } from 'pages/DoctorAppointment';
import EditPills from 'pages/EditPills';
import SettingsPage from 'pages/Settings';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import useMount from '../hooks/useMount';
import useTheme from '../hooks/useTheme';
import { cancelAllNotifications, decrementMedsSupply } from '../store/slices/medsScheduleSlice';
import checkPermissions from '../utils/checkPermissions';
import notifyInstant from '../utils/notifyInstant';

import AddPills from './AddPills';
import BottomTabsScreen from './BottomTabs';

export type WrapperStackParamList = {
  Home: undefined;
  EditPills: { id: string; openFromPushStatus?: string };
  AddPills: undefined;
  DoctorAppointment: { visitInfo: DoctorVisit } | undefined;
  Settings: undefined;
  TreatmentPage: undefined;
  DoctorsPage: undefined;
};

const Stack = createStackNavigator<WrapperStackParamList>();

function AppWrapper() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.medsScheduleReducer);
  console.log(state.schedule[0]?.medsSupply);

  if (+state.schedule[0]?.medsSupply < +state.schedule[0]?.medsRest) {
    notifyInstant();
  }

  useMount(() => {
    checkPermissions().then((permissionStatus: boolean) => {
      if (!permissionStatus) {
        dispatch(cancelAllNotifications());
      }
    });
  });

  useEffect(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.ACTION_PRESS && pressAction?.id === 'medsTaken') {
        dispatch(decrementMedsSupply(notification?.data?.medsId));
      }

      if (type === EventType.PRESS && notification?.data?.medsId) {
        Linking.openURL(
          'takeyourmeds://Home/TreatmentPage' +
            '?id=' +
            `${notification.data.medsId}` +
            '&openFromPushStatus=' +
            'true'
        );
      }
    });
  }, [dispatch]);

  const linking = {
    prefixes: ['takeyourmeds://'],
    config: {
      screens: {
        Home: {
          path: 'Home',
          screens: {
            TreatmentPage: 'TreatmentPage',
          },
        },
        EditPills: 'EditPills/:id',
        Settings: 'Settings',
      },
    },
    async getInitialUrl() {
      return await Linking.getInitialURL();
    },
    // getStateFromPath(path, config) {
    //   const initialState = JSON.parse(JSON.stringify(getStateFromPath(path, config)));
    //   if (initialState.routes[0].name === 'EditPills') {
    //     initialState?.routes.unshift({
    //       name: 'Home',
    //       state: {
    //         routes: [{ name: 'TreatmentPage' }],
    //       },
    //     });
    //   }
    //   console.log(initialState);
    //   return initialState;
    // },
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
