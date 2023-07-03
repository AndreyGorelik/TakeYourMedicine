import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Keyboard } from 'react-native';

import Text from './Text';

interface CheckboxItem {
  label: string;
  id: string;
  notificationCount: number;
}

interface CheckboxFormInterface {
  data: CheckboxItem[];
  getBack?: React.Dispatch<React.SetStateAction<number>>;
  scrollable?: boolean;
}

const CheckboxForm = ({ data, getBack, scrollable = true }: CheckboxFormInterface) => {
  const [checkedItem, setCheckedItem] = useState('');

  const chooseItem = (item: CheckboxItem) => {
    setCheckedItem(item.id);
    if (getBack) {
      getBack(item.notificationCount);
    }
  };

  const renderWithScroll = ({ item }: { item: CheckboxItem }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          chooseItem(item);
        }}
        style={styles.container}
      >
        <Text>{item.label}</Text>
        <View style={styles.radioButton}>
          <View
            style={checkedItem === item.id ? styles.radioButtonIconChecked : styles.radioButtonIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderWithoutScroll = (item: CheckboxItem) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          chooseItem(item);
        }}
        style={styles.container}
        key={item.id}
      >
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
      {scrollable ? (
        <FlatList data={data} renderItem={renderWithScroll} keyExtractor={(item) => item.id} />
      ) : (
        data.map(renderWithoutScroll)
      )}
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
