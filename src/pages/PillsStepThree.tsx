import type { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import Button from 'components/Button';
import CameraGallery from 'components/CameraGallery';
import Text from 'components/Text';

import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AddPills';

type Props = StackScreenProps<RootStackParamList, 'AddMedsStepThree'>;

function PillsStepThree(props: any) {
  const { themeStyle } = useTheme();
  const { navigation } = props;
  const all = props.route.params;

  return (
    <View style={[{ backgroundColor: themeStyle.colors.back }, styles.view]}>
      <Text variant="h3">Add photo</Text>
      <CameraGallery />
      <View style={styles.navigationButtons}>
        <Button title="Back" onPress={() => navigation.navigate('AddMedsStepTwo', all)} />
        <Button
          title="Save"
          disabled={false}
          onPress={() => navigation.navigate('AddMedsStepTwo', nextScreenProps)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    gap: 10,
  },
});

export default PillsStepThree;
