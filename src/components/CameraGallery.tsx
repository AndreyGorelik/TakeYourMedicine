import { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { noPhoto } from '../assets/images';

import Button from './Button';
import Text from './Text';

function CameraGallery() {
  const [photo, setPhoto] = useState(noPhoto);

  const openCamera = async () => {
    // const result = await launchCamera();
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });
    if (result.assets) {
      setPhoto('data:image/png;base64,' + result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openGallery}>
        <FontAwesome name="photo" size={54} color={'#4B454D'} />
        <Text>Take photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openCamera}>
        <Entypo name="camera" size={54} color={'#4B454D'} />
        <Text>Upload from phone</Text>
      </TouchableOpacity>
      <Image
        style={styles.medsImage}
        source={{
          uri: photo,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  medsImage: {
    width: 150,
    height: 150,
  },
});

export default CameraGallery;
