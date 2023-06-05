import { StyleSheet, View, Button } from 'react-native';
import Text from 'components/Text';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'components/ProgressBar';
function PillsStepOne() {
  const navigation = useNavigation()
  const {goBack} = navigation;

  return (
    <View style={styles.view}>
      <Text>1</Text>
      <Button title='back' onPress={()=> goBack()}/>
      <Button title='forward' onPress={()=> navigation.navigate('AddMedsStepTwo' as never)}/>
      <ProgressBar range={50}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
});

export default PillsStepOne;
