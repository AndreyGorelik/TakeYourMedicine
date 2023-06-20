import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import Text from './Text';
import TextInput from './TextInput';

interface ModalInput {
  value: string;
  onChangeText: any;
  label: string;
}

const ModalWithInput = ({ value, onChangeText, label }: ModalInput) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.outerView}>
        <Text>{label}</Text>
        <Text>{value}</Text>
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
                <TextInput
                  placeholder={label}
                  value={value}
                  onChangeText={onChangeText}
                  keyboardType="numeric"
                  maxLength={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
  },
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
    width: '50%',
  },
});

export default ModalWithInput;
