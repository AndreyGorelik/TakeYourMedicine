import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProgressTabBar from 'components/ProgressTabBar';
import PillsStepOne from 'pages/PillsStepOne';
import PillsStepTwo from 'pages/PillsStepTwo';

export type RootStackParamList = {
  AddMedsStepOne: { range: number };
  AddMedsStepTwo: { range?: number; medsDosage: string; medsName: string; medsRegularity: number };
};

function AddPills() {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <Tab.Navigator tabBar={(props) => <ProgressTabBar {...props} />}>
      <Tab.Screen
        name="AddMedsStepOne"
        component={PillsStepOne}
        options={{
          title: 'Step 1',
          headerStyle: {
            height: 60,
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 28,
            paddingVertical: 10,
          },
        }}
        initialParams={{ range: 50 }}
      />
      <Tab.Screen
        name="AddMedsStepTwo"
        component={PillsStepTwo}
        options={{
          title: 'Step 2',
          headerStyle: {
            height: 60,
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 28,
            paddingVertical: 10,
          },
        }}
        initialParams={{ range: 100 }}
      />
    </Tab.Navigator>
  );
}

export default AddPills;
