import {
  Modal,
  Alert,
  Pressable,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: heightScreen, width: widthScreen } = Dimensions.get("window");

function BottomSheet() {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -heightScreen + 50)
    });

  const rActionSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(()=>{
    translateY.value = withSpring(-heightScreen / 3, { damping: 50})
  }, [])

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.actionSheetContainer, rActionSheetStyle]}>
        <Text>1234</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    height: heightScreen,
    width: widthScreen,
    backgroundColor: "orange",
    position: "absolute",
    top: heightScreen,
    // bottom: 0,
    borderRadius: 25,
  },
});

export default BottomSheet;
