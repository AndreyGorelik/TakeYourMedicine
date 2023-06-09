import { useRef } from 'react';
import { StyleSheet, TextInput as NativeTextInput, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface TextInputCustom {
  placeholder: string;
  value: string;
  [x: string]: unknown;
}

type focusAndBlur = 'focus' | 'blur';

const ANIMATION_DURATION = 150;

const TextInput = ({ placeholder, value, ...rest }: TextInputCustom) => {
  const inputRef = useRef<NativeTextInput>(null);
  const top = useSharedValue(30);
  const paddingHorizontal = useSharedValue(10);

  const movePlaceholder = (status: focusAndBlur) => {
    if (status === 'focus') {
      top.value = withTiming(0, { duration: ANIMATION_DURATION });
      paddingHorizontal.value = withTiming(0, { duration: ANIMATION_DURATION });
    } else {
      if (!value) {
        top.value = withTiming(30, { duration: ANIMATION_DURATION });
        paddingHorizontal.value = withTiming(10, { duration: ANIMATION_DURATION });
      }
    }
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      paddingHorizontal: paddingHorizontal.value,
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.placeholder, reanimatedStyle]}>
        <Text>{placeholder}</Text>
      </Animated.View>
      <NativeTextInput
        onFocus={() => movePlaceholder('focus')}
        onBlur={() => movePlaceholder('blur')}
        ref={inputRef}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  placeholder: {
    color: 'orange',
    position: 'relative',
  },
});

export default TextInput;
