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

export default AddPills;
