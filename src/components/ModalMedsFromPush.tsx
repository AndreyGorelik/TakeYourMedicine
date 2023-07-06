import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../hooks/redux-hooks';
import { decrementMedsSupply } from '../store/slices/medsScheduleSlice';

import Text from './Text';

interface ModalMedsFromPushProps {
  id: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  decreaseMeds: any;
}

function ModalMedsFromPush({
  id,
  modalVisible,
  setModalVisible,
  decreaseMeds,
}: ModalMedsFromPushProps) {
  const dispatch = useAppDispatch();

  const takeMeds = () => {
    dispatch(decrementMedsSupply(id));
    decreaseMeds();
    setModalVisible(!modalVisible);
  };

  const skipMeds = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <Modal
      transparent={true}
      onRequestClose={() => setModalVisible(!modalVisible)}
      visible={modalVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={takeMeds}>
              <Text variant="h5">TAKE IT</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity>
              <Text variant="h5">REMIND LATER</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={skipMeds}>
              <Text variant="h5">SKIP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
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
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#e8e8e8',
  },
});

export default ModalMedsFromPush;
