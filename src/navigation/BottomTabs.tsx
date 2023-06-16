import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SettingsButton from 'components/SettingsButton';
import TabBar from 'components/TabBar';
import HomePage from 'pages/Home';
import TreatmentPage from 'pages/TreatmentPage';

function BottomTabsScreen() {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="TreatmentPage"
        component={TreatmentPage}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="pills" size={size} color={color} />,
          headerRight: () => <SettingsButton />,
          tabBarLabel: 'Treatment',
          title: 'Treatment',
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
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" size={size} color={color} />
          ),
          headerRight: () => <SettingsButton />,
          tabBarLabel: t('home') as string,
          title: t('home') as string,
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
      <Tab.Screen
        name="Maps"
        component={TreatmentPage}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="map-marked-alt" size={size} color={color} />,
          headerRight: () => <SettingsButton />,
          tabBarLabel: 'Treatment',
          title: 'Treatment',
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
    </Tab.Navigator>
  );
}

export default BottomTabsScreen;
