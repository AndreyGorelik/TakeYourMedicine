import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, FlatList, Keyboard } from 'react-native';

import Text from './Text';

interface CheckboxItem {
  label: string;
  id: string;
}

function ModalWithCheckbox({
  data,
  checkedItem,
  getBack,
  title,
}: {
  data: CheckboxItem[];
  checkedItem: CheckboxItem;
  getBack: any;
  title: string;
}) {
  const [visible, setVisible] = useState(false);

  const chooseItem = (item: CheckboxItem) => {
    setVisible(false);
    getBack(item);
  };

  const renderItem = ({ item }: { item: CheckboxItem }) => {
    return (
      <TouchableOpacity onPress={() => chooseItem(item)} style={styles.modalItem}>
        <Text>{item.label}</Text>
        <View style={styles.radioButton}>
          <View
            style={
              checkedItem.id === item.id ? styles.radioButtonIconChecked : styles.radioButtonIcon
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
        style={styles.outerView}
      >
        <Text>{title}</Text>
        <Text>{checkedItem.label + '▼'}</Text>
      </TouchableOpacity>
      {visible ? (
        <Modal transparent={true} onRequestClose={() => setVisible(!visible)}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setVisible(!visible)}
            activeOpacity={1}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  outerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 100,
  },
});

export default ModalWithCheckbox;
