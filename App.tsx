import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressTabBar from 'components/ProgressTabBar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import './18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SettingsButton from './src/components/SettingsButton';
import useTheme from './src/hooks/useTheme';
import HomePage from './src/pages/Home';
import PillsStepOne from './src/pages/PillsStepOne';
import PillsStepTwo from './src/pages/PillsStepTwo';
import SettingsPage from './src/pages/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const theme = useTheme();
  const { t } = useTranslation();

  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
            headerRight: () => <SettingsButton />,
            tabBarLabel: t('home') as string,
            title: t('home') as string,
          }}
        />
        <Tab.Screen
          name="Ho2mePage"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="pills" size={size} color={color} />,
            headerRight: () => <SettingsButton />,
            tabBarLabel: t('home') as string,
            title: 'Pills',
          }}
        />
      </Tab.Navigator>
    );
  }

  function Form() {
    return (
      <Tab.Navigator tabBar={(props) => <ProgressTabBar {...props} />}>
        <Tab.Screen
          name="AddMedsStepOne"
          component={PillsStepOne}
          options={{}}
          initialParams={{ range: 50 }}
        />
        <Tab.Screen
          name="AddMedsStepTwo"
          component={PillsStepTwo}
          options={{}}
          initialParams={{ range: 100 }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={styles.view}>
      <NavigationContainer theme={theme.themeStyle}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} />
          <Stack.Screen
            name="Settings"
            children={() => <SettingsPage changeTheme={theme.changeTheme} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default App;
