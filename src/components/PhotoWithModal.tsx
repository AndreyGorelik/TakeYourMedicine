import { useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import { medsInfo } from 'pages/TreatmentPage';

import { noPhoto } from '../assets/images';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { deletePhoto, updatePhoto } from '../store/slices/medsScheduleSlice';

import Button from './Button';

export enum PhotoSource {
  Camera = 'camera',
  Gallery = 'gallery',
}

function PhotoWithModal({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const { photo } = useAppSelector((state) =>
    state.medsScheduleReducer.schedule.find((item: medsInfo) => item.id === id)
  );

  const takePhoto = async (photoSource: PhotoSource) => {
    const result =
      photoSource === PhotoSource.Camera
        ? await launchCamera({ mediaType: 'photo', saveToPhotos: true })
        : await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      dispatch(
        updatePhoto({
          id,
          photo: result.assets[0].uri,
        })
      );
      closeModal();
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleDeletePhoto = () => {
    dispatch(deletePhoto(id));
    closeModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Image
          style={styles.medsImage}
          source={{
            uri: photo,
          }}
        />
      </TouchableOpacity>
      {modalVisible ? (
        <Modal transparent={true} onRequestClose={closeModal}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal} activeOpacity={1}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {noPhoto === photo ? null : (
                  <Button title="Delete photo" onPress={handleDeletePhoto} />
                )}
                <Button title="Take new photo" onPress={() => takePhoto(PhotoSource.Camera)} />
                <Button title="Upload from phone" onPress={() => takePhoto(PhotoSource.Gallery)} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  medsImage: {
    width: 130,
    height: 130,
    borderRadius: 25,
  },
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
  },
});

export default PhotoWithModal;
