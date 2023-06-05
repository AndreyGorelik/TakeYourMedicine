import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Text from 'components/Text';
import { useNavigation } from '@react-navigation/native';
import CheckboxForm from 'components/CheckboxForm';

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

  const isFormChecked = checkFormFilled()

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={setMedsName}
        value={medsName}
        placeholder="Meds name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMedsDosage}
        value={medsDosage}
        placeholder="Meds dosage"
      />
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
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    borderColor: 'gray',
  },
});

export default PillsStepOne;
