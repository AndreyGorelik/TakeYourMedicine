import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProgressTabBar from 'components/ProgressTabBar';
import PillsStepOne from 'pages/PillsStepOne';
import PillsStepThree from 'pages/PillsStepThree';
import PillsStepTwo from 'pages/PillsStepTwo';

export type RootStackParamList = {
  AddMedsStepOne: { range: number };
  AddMedsStepTwo: { range?: number; medsDosage: string; medsName: string; medsRegularity: number };
  AddMedsStepThree: any;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function AddPills() {
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
        initialParams={{ range: 33 }}
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
        initialParams={{ range: 60 }}
      />
      <Tab.Screen
        name="AddMedsStepThree"
        component={PillsStepThree}
        options={{
          title: 'Step 3',
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
