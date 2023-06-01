import Text from "../components/Text";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import FloatingButton from "../components/FloatingButton";
import ActionSheet, {ACTION_SHEET_SIZE} from "../components/ActionSheet";
import { BottomSheetRefProps } from "../components/ActionSheet";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";

function HomePage() {
  const { t } = useTranslation();
  const ref = useRef<BottomSheetRefProps>(null);
  const navigation = useNavigation();

  const onPress = () => {
    const isActive = ref?.current?.isActive;
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(ACTION_SHEET_SIZE);
    }
  }

  const sayHi = () => {
    navigation.navigate('Settings' as never)
  }

  const options = [
    { label: "Option 1", function: sayHi, id: "1" },
    { label: "Option 2", function: sayHi, id: "2" },
    { label: "Option 3", function: sayHi, id: "3" },
    { label: "Option 4", function: sayHi, id: "4" }
  ]

  return (
    <View style={styles.view}>
      <Text>{t("greeting")}</Text>
      <FloatingButton onPress={onPress} />
      <ActionSheet
        ref={ref}
        options={options}
      />
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
