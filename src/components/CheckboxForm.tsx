import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import Text from './Text';

interface CheckboxItem {
  label: string;
  id: string;
  notificationCount: number;
}

interface CheckboxFormInterface {
  data: CheckboxItem[];
  getBack?: React.Dispatch<React.SetStateAction<number>>;
}

const CheckboxForm = ({ data, getBack }: CheckboxFormInterface) => {
  const [checkedItem, setCheckedItem] = useState('');

  const chooseItem = (item: CheckboxItem) => {
    setCheckedItem(item.id);
    if (getBack) {
      getBack(item.notificationCount);
    }
  };

  const renderItem = ({ item }: { item: CheckboxItem }) => {
    return (
      <TouchableOpacity onPress={() => chooseItem(item)} style={styles.container}>
        <Text>{item.label}</Text>
        <View style={styles.radioButton}>
          <View
            style={checkedItem === item.id ? styles.radioButtonIconChecked : styles.radioButtonIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  view: {
    flex: 1,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#003F5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  radioButtonIconChecked: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#0099FF',
  },
});

export default CheckboxForm;
