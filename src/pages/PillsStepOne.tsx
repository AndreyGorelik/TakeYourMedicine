import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import CheckboxForm from 'components/CheckboxForm';
import TextInput from 'components/TextInput';

import { RootStackParamList } from '../navigation/AddPills';

const mockData = [
  { label: 'Один раз в день', notificationCount: 1, id: '1' },
  { label: 'Два раза в день', notificationCount: 2, id: '2' },
  { label: 'Три раза в день', notificationCount: 3, id: '3' },
];

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepOne'>;

function PillsStepOne({ navigation }: Props) {
  const [medsName, setMedsName] = useState('');
  const [medsDosage, setMedsDosage] = useState('');
  const [medsRegularity, setMedsRegularity] = useState(0);

  const checkFormFilled = () => {
    if (medsName && medsDosage && !!medsRegularity) {
      return true;
    }
    return false;
  };

  const isFormChecked = checkFormFilled();
  const nextScreenProps = {
    medsName,
    medsDosage,
    medsRegularity,
  };

  return (
    <View style={styles.view}>
      <TextInput onChangeText={setMedsName} value={medsName} placeholder="Meds name" />
      <TextInput onChangeText={setMedsDosage} value={medsDosage} placeholder="Meds dosage" />
      <CheckboxForm data={mockData} getBack={setMedsRegularity} />

      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button
        title="Forward"
        disabled={isFormChecked ? false : true}
        onPress={() => navigation.navigate('AddMedsStepTwo', nextScreenProps)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
});

export default PillsStepOne;
