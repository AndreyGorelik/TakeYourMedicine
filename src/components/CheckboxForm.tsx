import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

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
        <View style={checkedItem === item.id ? styles.checkboxChecked : styles.checkbox} />
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 50,
    borderColor: 'orange',
    borderWidth: 3,
  },
  checkboxChecked: {
    height: 20,
    width: 20,
    backgroundColor: 'orange',
    margin: 10,
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 3,
  },
});

export default CheckboxForm;
