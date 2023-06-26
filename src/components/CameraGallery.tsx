import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTheme from '../hooks/useTheme';

import Text from './Text';

interface CameraPhoto {
  photo: string;
  // eslint-disable-next-line no-unused-vars
  setPhoto: (photo: string) => void;
}

enum PhotoSource {
  Camera = 'camera',
  Gallery = 'gallery',
}

function CameraGallery({ photo, setPhoto }: CameraPhoto) {
  const { themeStyle } = useTheme();
  const takePhoto = async (photoSource: PhotoSource) => {
    const result =
      photoSource === PhotoSource.Camera
        ? await launchCamera({ mediaType: 'photo', includeBase64: true })
        : await launchImageLibrary({ mediaType: 'photo', includeBase64: true });
    if (result.assets) {
      setPhoto('data:image/png;base64,' + result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoPreview}>
        <Image
          style={styles.medsImage}
          source={{
            uri: photo,
          }}
        />
      </View>
      <View style={styles.photoControl}>
        <TouchableOpacity
          onPress={() => takePhoto(PhotoSource.Camera)}
          style={styles.photoControlItem}
        >
          <Entypo name="camera" size={54} color={themeStyle.colors.primary} />
          <Text>Take photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takePhoto(PhotoSource.Gallery)}
          style={styles.photoControlItem}
        >
          <FontAwesome name="photo" size={54} color={themeStyle.colors.primary} />
          <Text>Upload from phone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    gap: 50,
  },
  medsImage: {
    width: 250,
    height: 250,
    borderRadius: 25,
  },
  photoPreview: {
    alignItems: 'center',
  },
  photoControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoControlItem: {
    alignItems: 'center',
  },
});

export default CameraGallery;
