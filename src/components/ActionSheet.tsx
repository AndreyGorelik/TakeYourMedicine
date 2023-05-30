import { Modal, Alert, Pressable, Text, StyleSheet, View, Button } from "react-native";
import { useState } from "react";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function ActionSheet() {
  const [modalVisible, setModalVisible] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <View>
      <Button title="click" onPress={() => { setModalVisible(true) }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{marginBottom: 0 && tabBarHeight, ...styles.modalView}}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    position: 'absolute',
    width: "100%",
    bottom: 0,
    minHeight: 500
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ActionSheet;