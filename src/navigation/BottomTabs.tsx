import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SettingsButton from 'components/SettingsButton';
import HomePage from 'pages/Home';

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

export default BottomTabsScreen;
