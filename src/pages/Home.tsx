import Text from "../components/Text";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import FloatingButton from "../components/FloatingButton";
import ActionSheet from "../components/ActionSheet";
import BottomSheet from "../components/BottomSheet";
function HomePage() {
  const { t } = useTranslation();

  const sayHi = () => {
    alert('hi')
  }

  return (
    <View style={styles.view}>
      <Text>{t('greeting')}</Text>
      <Text>AA22213123hgfhfg222AA</Text>
      <FloatingButton onPress={sayHi}/>
      <BottomSheet/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
});


export default HomePage;
