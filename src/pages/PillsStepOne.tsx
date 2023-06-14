import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from 'components/Button';
import CheckboxForm from 'components/CheckboxForm';
import TextInput from 'components/TextInput';

import { RootStackParamList } from '../navigation/AddPills';

const mockData = [
  { label: 'Один раз в день', notificationCount: 1, id: '1' },
  { label: 'Два раза в день', notificationCount: 2, id: '2' },
  { label: 'Три раза в день', notificationCount: 3, id: '3' },
  { label: 'Нужно больше вариантов', notificationCount: 4, id: '4' },
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
      <View style={styles.navigationButtons}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button
          title="Next"
          disabled={isFormChecked ? false : true}
          onPress={() => navigation.navigate('AddMedsStepTwo', nextScreenProps)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 25,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    gap: 10,
  },
});

export default PillsStepOne;
