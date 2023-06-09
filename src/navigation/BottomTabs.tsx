import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SettingsButton from 'components/SettingsButton';
import HomePage from 'pages/Home';
import TreatmentPage from 'pages/TreatmentPage';

function BottomTabsScreen() {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
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
        name="TreatmentPage"
        component={TreatmentPage}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="pills" size={size} color={color} />,
          headerRight: () => <SettingsButton />,
          tabBarLabel: 'Treatment',
          title: 'Treatment',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsScreen;
