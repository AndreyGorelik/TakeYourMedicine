import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

import EditPills from 'pages/EditPills';
import SettingsPage from 'pages/Settings';

import useTheme from '../hooks/useTheme';

import AddPills from './AddPills';
import BottomTabsScreen from './BottomTabs';

const Stack = createStackNavigator();
function AppWrapper() {
  const theme = useTheme();
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
          <Stack.Screen name="EditPills" component={EditPills} options={{ headerShown: false }} />
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
