import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Button from 'components/Button';
import CheckboxForm from 'components/CheckboxForm';
import ModalWithCheckbox from 'components/ModalWithCheckbox';
import ModalWithInput from 'components/ModalWithInput';
import Text from 'components/Text';
import TextInput from 'components/TextInput';

import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';
const mockData = [
  { label: 'Один раз в день', notificationCount: 1, id: '1' },
  { label: 'Два раза в день', notificationCount: 2, id: '2' },
  { label: 'Три раза в день', notificationCount: 3, id: '3' },
  { label: 'Нужно больше вариантов', notificationCount: 4, id: '4' },
];

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepOne'>;

const mockDataForm = [
  { label: 'Таблетки', id: '1' },
  { label: 'Спрей', id: '2' },
  { label: 'Единицы', id: '3' },
  { label: 'Ингаляции', id: '4' },
  { label: 'Капли', id: '5' },
];

function PillsStepOne({ navigation }: Props) {
  const [medsName, setMedsName] = useState('');
  const [medsDescription, setMedsDescription] = useState('');
  const [medsRegularity, setMedsRegularity] = useState(0);
  const [medsForm, setMedsForm] = useState(mockDataForm[0]);
  const [medsSupply, setMedsSupply] = useState(20);
  const { themeStyle } = useTheme();

  const checkFormFilled = () => {
    if (medsName && !!medsRegularity) {
      return true;
    }
    return false;
  };

  const isFormChecked = checkFormFilled();
  const nextScreenProps = {
    medsName,
    medsDescription,
    medsRegularity,
    medsForm,
    medsSupply: medsSupply.toString(),
  };

  return (
    <View style={styles.view}>
      <ScrollView style={[{ backgroundColor: themeStyle.colors.back }, styles.top]}>
        <Text variant="h3">Basic</Text>
        <TextInput onChangeText={setMedsName} value={medsName} placeholder="Meds name" />
        <TextInput
          onChangeText={setMedsDescription}
          value={medsDescription}
          placeholder="Meds description"
        />
        <ModalWithCheckbox
          data={mockDataForm}
          checkedItem={medsForm}
          getBack={setMedsForm}
          title={'Форма лекарства'}
        />
        <ModalWithInput label="Запас" value={medsSupply.toString()} onChangeText={setMedsSupply} />
        <Text variant="h3">Schedule</Text>
        <CheckboxForm data={mockData} getBack={setMedsRegularity} scrollable={false} />
      </ScrollView>
      <View style={[{ backgroundColor: themeStyle.colors.back }, styles.navigationButtons]}>
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
  },
  top: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    gap: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 25,
  },
});

export default PillsStepOne;
