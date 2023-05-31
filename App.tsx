import React from "react";
import { StyleSheet, Button } from "react-native";
import SettingsPage from "./src/pages/Settings";
import HomePage from "./src/pages/Home";
import useTheme from "./src/hooks/useTheme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import "./18n";
import "react-native-gesture-handler";
import SettingsButton from "./src/components/SettingsButton";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerRight: () => <SettingsButton />,
            tabBarLabel: t("home") as string,
            title: t("home") as string,
          }}
        />
        <Tab.Screen
          name="Ho2mePage"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="pills" size={size} color={color} />
            ),
            headerRight: () => <SettingsButton />,
            tabBarLabel: t("home") as string,
            title: "Pills",
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={theme.themeStyle}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
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
  viewColors: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
