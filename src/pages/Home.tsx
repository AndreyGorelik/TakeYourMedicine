import Text from "../components/Text";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Alert } from "react-native";
import FloatingButton from "../components/FloatingButton";
import ActionSheet from "../components/ActionSheet";
import { BottomSheetRefProps } from "../components/ActionSheet";
import { useCallback, useEffect, useRef, useState } from "react";

function HomePage() {
  const { t } = useTranslation();

  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive;
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);

  const sayHi = () => {
    Alert.alert('hi')
  }


  return (
    <View style={styles.view}>
      <Text>{t("greeting")}</Text>
      <FloatingButton onPress={onPress} />
      <ActionSheet ref={ref} opt={[{label: "Hello", function: sayHi}, {label: "Гамарджоба", function: sayHi}]}/>
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
