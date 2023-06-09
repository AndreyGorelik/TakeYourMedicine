import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { RootStackParamList } from '../navigation/AddPills';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepTwo'>;

function PillsStepTwo(props: Props) {
  const { navigation } = props;
  const { medsRegularity } = props.route.params;
  const { goBack } = navigation;

  const [dates, setDates] = useState(Array.from({ length: medsRegularity }, () => new Date()));
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  const handleConfirm = (date: Date) => {
    setDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[openIndex!] = date;
      return newDates;
    });
    handleClose();
  };

  const renderItem = ({ item, index }: { item: Date; index: number }) => {
    const isOpen = openIndex === index;
    return (
      <View>
        <TouchableOpacity style={styles.reminder} onPress={() => handleOpen(index)}>
          <Text>{Number(index + 1)} прием</Text>
          {isOpen && (
            <DatePicker
              open={true}
              mode="time"
              date={item}
              onConfirm={handleConfirm}
              onCancel={handleClose}
            />
          )}
          <Text>{`${item.getHours()}` + ':' + `${item.getMinutes()}` + '▼'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={dates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Button title="back" onPress={() => goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 15,
  },
  reminder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default PillsStepTwo;
