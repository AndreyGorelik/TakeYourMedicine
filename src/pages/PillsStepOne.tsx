import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import CheckboxForm from 'components/CheckboxForm';
import TextInput from 'components/TextInput';

const mockData = [
  { label: 'Один раз в день', id: '1' },
  { label: 'Два раза в день', id: '2' },
  { label: 'Три раза в день', id: '3' },
  { label: 'По мере необходимости', id: '4' },
];

function PillsStepOne() {
  const navigation = useNavigation();
  const { goBack } = navigation;
  const [medsName, setMedsName] = useState('');
  const [medsDosage, setMedsDosage] = useState('');
  const [medsRegularity, setMedsRegularity] = useState('');

  const checkFormFilled = () => {
    if (medsName && medsDosage && medsRegularity) {
      return true;
    }
    return false;
  };

  const isFormChecked = checkFormFilled();

  return (
    <View style={styles.view}>
      <TextInput onChangeText={setMedsName} value={medsName} placeholder="Meds name" />
      <TextInput onChangeText={setMedsDosage} value={medsDosage} placeholder="Meds dosage" />
      <CheckboxForm data={mockData} getBack={setMedsRegularity} />

      <Button title="Back" onPress={() => goBack()} />
      <Button
        title="Forward"
        disabled={isFormChecked ? false : true}
        onPress={() => navigation.navigate('AddMedsStepTwo' as never)}
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
