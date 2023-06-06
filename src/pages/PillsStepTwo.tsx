import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';

import Text from 'components/Text';

function PillsStepTwo() {
  const navigation = useNavigation();
  const { goBack } = navigation;

  return (
    <View style={styles.view}>
      <Text>2</Text>
      <Button title="back" onPress={() => goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default PillsStepTwo;
