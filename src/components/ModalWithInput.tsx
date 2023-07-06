import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Keyboard } from 'react-native';

import Text from './Text';
import TextInput from './TextInput';

interface ModalInput {
  value: string;
  onChangeText: unknown;
  label: string;
  disabled?: boolean;
}

const ModalWithInput = ({ value, onChangeText, label, disabled = false }: ModalInput) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
        style={styles.outerView}
      >
        <Text variant={disabled ? 'disabled' : undefined}>{label}</Text>
        <Text variant={disabled ? 'disabled' : undefined}>{value}</Text>
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
  outerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
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
    width: '80%',
  },
});

export default ModalWithInput;
